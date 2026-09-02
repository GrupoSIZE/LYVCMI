/* LYV.CMI V4.2 — frente e verso formam uma identificação. */
const V42_ID_FIELDS=[
 ['nome','Nome',/nome/i],['documento','Número do documento (n.º civil / cartão)',/documento|civil|cartão/i],
 ['nif','NIF / Tax ID',/nif|tax id|fiscal/i],['niss','N.º Segurança Social',/segurança social|niss/i],
 ['numero_utente_saude','N.º Utente Saúde',/utente.*saúde|saúde.*utente/i],
 ['data_nascimento','Data de nascimento',/nascimento/i],['validade_documento','Validade do documento',/validade|válido até/i],
 ['nacionalidade','Nacionalidade',/nacionalidade/i],['morada_proprietario','Morada',/^morada|domicílio/i]
];
const _v42OpenBase=v41OpenCmiOcr;
v41OpenCmiOcr=function(prefix,purpose){
 _v42OpenBase(prefix,purpose);const input=document.getElementById('v40-file'),drop=input?.closest('.v40-ocr-drop');
 drop?.querySelector('.v42-id-sides')?.remove();
 if(purpose==='proprietario'&&drop){
  input.style.display='none';input.multiple=false;
  const sides=document.createElement('div');sides.className='v42-id-sides';
  sides.innerHTML='<div class="v42-id-side"><label>Frente do documento</label><input id="v42-id-front" type="file" accept="image/jpeg,image/png,image/webp,application/pdf"></div><div class="v42-id-side"><label>Verso do documento</label><input id="v42-id-back" type="file" accept="image/jpeg,image/png,image/webp,application/pdf"></div>';
  input.insertAdjacentElement('afterend',sides);const help=drop.querySelector('div:last-child');
  if(help)help.textContent='Seleciona a frente e o verso da mesma pessoa. Serão reunidos numa única ficha.';
 }else if(input)input.style.display='';
};
async function v42Agency(user){
 const ok=v=>/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(v||''));let id=ok(currentAgenciaId)?currentAgenciaId:null;
 if(!id){const q=await supa.from('agencia_users').select('agencia_id').eq('user_id',user.id).eq('ativo',true).limit(1).maybeSingle();if(q.error)throw q.error;id=q.data?.agencia_id}
 if(!ok(id)){const q=await supa.from('agencias').select('id').or('owner_user_id.eq.'+user.id+',user_id.eq.'+user.id).limit(1).maybeSingle();if(q.error)throw q.error;id=q.data?.id}
 if(!ok(id))throw new Error('Não foi possível identificar a agência.');return currentAgenciaId=id;
}
function v42PtFullName(value){
 const raw=String(value||'').replace(/\s+/g,' ').trim();if(!raw.includes(','))return raw;
 const parts=raw.split(',').map(x=>x.trim()).filter(Boolean);return parts.length===2?(parts[1]+' '+parts[0]).replace(/\s+/g,' ').trim():raw;
}
function v42Merge(results){
 const fields=results.flatMap(r=>(r.campos||[]).map(x=>x.chave==='nome'?{...x,valor:v42PtFullName(x.valor)}:x)),warnings=results.flatMap(r=>r.avisos||[]),by=new Map();
 fields.forEach(x=>{const old=by.get(x.chave);if(old&&String(old.valor)!==String(x.valor))warnings.push('Valores diferentes para '+(x.label||x.chave)+'. Confirma manualmente.');const preferLongerName=x.chave==='nome'&&String(x.valor||'').length>String(old?.valor||'').length;if(!old||preferLongerName||Number(x.confianca||0)>Number(old.confianca||0)&&x.chave!=='nome')by.set(x.chave,x)});
 return {tipo_documento:'cartao_cidadao',qualidade:results.reduce((n,r)=>n+Number(r.qualidade||0),0)/results.length,avisos:[...new Set(warnings)],campos:[...by.values()]};
}
async function v42ReadBundle(files){
 const err=document.getElementById('v40-error'),btn=document.getElementById('v40-read');err.style.display='none';
 if(!files.length){err.textContent='Seleciona pelo menos a frente.';err.style.display='block';return}
 if(files.some(f=>f.size>20*1024*1024)){err.textContent='Cada ficheiro não pode exceder 20 MB.';err.style.display='block';return}
 btn.disabled=true;const rows=[],results=[];
 try{
  const {data:{user}}=await supa.auth.getUser();if(!user)throw new Error('Sessão expirada.');const agency=await v42Agency(user);
  for(let i=0;i<files.length;i++){
   btn.innerHTML='<i class="ti ti-loader"></i>A ler '+(i+1)+'/'+files.length+'…';const file=files[i],ext=(file.name.split('.').pop()||'bin').toLowerCase(),path=agency+'/ocr/cmi/'+user.id+'/'+crypto.randomUUID()+'.'+ext;
   const up=await supa.storage.from('lyvcmi-docs').upload(path,file,{contentType:file.type,upsert:false});if(up.error)throw up.error;
   const ins=await supa.from('ocr_documentos').insert({agencia_id:agency,finalidade:'proprietario',tipo_documento:'cartao_cidadao',storage_path:path,nome_original:file.name,mime_type:file.type,created_by:user.id}).select('*').single();if(ins.error)throw ins.error;
   const call=await supa.functions.invoke('ocr-documento',{body:{documento_id:ins.data.id}});if(call.error){let d='';try{d=(await call.error.context?.clone?.().json())?.error||''}catch{}throw new Error(d||call.error.message)}if(call.data?.error)throw new Error(call.data.error);
   rows.push(ins.data);results.push(call.data.resultado);
  }
  v41CmiOcr.identityBundle=true;v41CmiOcr.ocrRows=rows;v40OcrRow=rows[0];v40OcrResult=v42Merge(results);
  v40RenderReview({name:files.map(f=>f.name).join(' + '),size:files.reduce((n,f)=>n+f.size,0)});
 }catch(e){console.error(e);err.textContent='Não foi possível ler: '+(e.message||e);err.style.display='block'}
 finally{btn.disabled=false;btn.innerHTML='<i class="ti ti-scan"></i>Ler documento'}
}
const _v42ReadBase=v40Read;
v40Read=async function(){
 if(v41CmiOcr?.purpose==='proprietario'){const files=[document.getElementById('v42-id-front')?.files?.[0],document.getElementById('v42-id-back')?.files?.[0]].filter(Boolean);return v42ReadBundle(files)}
 return _v42ReadBase();
};
function v42AllFields(result){
 const found=[...(result.campos||[])],used=new Set(),rows=[];
 V42_ID_FIELDS.forEach(([key,label,rx])=>{const i=found.findIndex((x,n)=>!used.has(n)&&(x.chave===key||rx.test(x.label||'')));if(i>=0){used.add(i);rows.push({...found[i],chave:key,label})}else rows.push({chave:key,label,valor:'',confianca:0,pagina:'—',origem_texto:'Não encontrado — preencher manualmente'})});
 found.forEach((x,i)=>{if(!used.has(i))rows.push(x)});return rows;
}
const _v42RenderBase=v40RenderReview;
v40RenderReview=function(file){
 if(document.getElementById('v40-purpose')?.value!=='proprietario')return _v42RenderBase(file);
 document.getElementById('v40-upload-step').style.display='none';document.getElementById('v40-review-step').style.display='block';const r=v40OcrResult||{},fields=v42AllFields(r),warnings=r.avisos||[];
 document.getElementById('v40-summary').innerHTML='<div class="nota inf"><strong>Identificação do proprietário</strong> · '+v2Esc(file.name)+' · '+v40Bytes(file.size)+' · qualidade '+Math.round((r.qualidade||0)*100)+'%</div>'+(warnings.length?'<div class="v40-warn"><strong>Verificar:</strong> '+warnings.map(v2Esc).join(' · ')+'</div>':'');
 document.getElementById('v40-fields').innerHTML=fields.map((x,i)=>'<div class="v40-ocr-field '+(x.valor?'':'v40-missing')+'"><input id="v40-use-'+i+'" type="checkbox" '+(x.valor?'checked':'')+'><label>'+v2Esc(x.label)+'</label><input id="v40-value-'+i+'" type="text" value="'+v2Esc(x.valor||'')+'" placeholder="Preencher manualmente" data-key="'+v2Esc(x.chave)+'" oninput="document.getElementById(\'v40-use-'+i+'\').checked=!!this.value.trim()"><span class="v40-confidence">'+(x.valor?Math.round((x.confianca||0)*100)+'%':'Manual')+'</span><div class="v40-source">'+(x.valor?'Pág. '+x.pagina+' · '+v2Esc(x.origem_texto||''):v2Esc(x.origem_texto))+'</div></div>').join('');
};
const _v42ConfirmBase=v40Confirm;
v40Confirm=async function(){
 if(!v41CmiOcr?.identityBundle)return _v42ConfirmBase();const selected=v40Selected();if(!selected.length){mostrarToast('Preenche pelo menos um campo.','err');return}
 try{v41ApplyCmiOwner(v41CmiOcr.prefix,selected);const {data:{user}}=await supa.auth.getUser(),ids=v41CmiOcr.ocrRows.map(x=>x.id),q=await supa.from('ocr_documentos').update({estado:'confirmado',confirmacao_json:{campos:selected,destino:'cmi',grupo:'frente_verso'},reviewed_by:user?.id||null,reviewed_at:new Date().toISOString()}).in('id',ids);if(q.error)throw q.error;v40Close();mostrarToast('Frente e verso confirmados como uma única identificação.','ok')}catch(e){mostrarToast('Erro ao preencher o CMI: '+(e.message||e),'err')}
};
