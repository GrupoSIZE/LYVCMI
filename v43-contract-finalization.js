/* LYV.CMI V4.3 — data de finalização e remuneração fixa por extenso. */
(function(){
 const baseEnhance=v39EnhanceOfficialCmi;
 v39EnhanceOfficialCmi=function(id){
  baseEnhance(id);if(!['cm-excl','cm-abrt'].includes(id))return;
  const p=id==='cm-excl'?'cmexcl':'cmabrt',form=document.getElementById('form-'+id);if(!form)return;
  const startDate=document.getElementById(p+'-cond-datainicio');
  if(startDate&&!startDate.value){const now=new Date();startDate.value=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10);}
  if(!document.getElementById(p+'-cond-comissao-tipo')){
   const commission=document.getElementById(p+'-cond-comissao')?.closest('.ff');
   if(commission){commission.insertAdjacentHTML('beforebegin','<div class="ff"><label>Tipo de remuneração</label><select id="'+p+'-cond-comissao-tipo" onchange="v43ToggleCommission(\''+p+'\')"><option value="percentagem">Percentagem</option><option value="fixa">Valor fixo</option></select></div>');commission.insertAdjacentHTML('afterend','<div class="ff v43-fixed-'+p+'" style="display:none"><label>Comissão fixa (€)</label><input id="'+p+'-cond-comissao-fixa" type="number" min="0" step="0.01" oninput="v43SuggestWords(\''+p+'\')"></div><div class="ff v43-fixed-'+p+'" style="display:none"><label>Comissão fixa por extenso</label><input id="'+p+'-cond-comissao-fixa-extenso" placeholder="Ex.: cinco mil euros"></div>');v43ToggleCommission(p);}
  }
  if(!document.getElementById(p+'-ce-numero')){const official=document.getElementById(p+'-of-area')?.closest('.form-card');if(official)official.insertAdjacentHTML('beforeend','<div class="fg" style="margin-top:10px"><div class="ff"><label>Fração autónoma</label><input id="'+p+'-im-fracao" placeholder="Ex.: FD"></div><div class="ff"><label>Andar / divisão</label><input id="'+p+'-im-andar"></div><div class="ff"><label>N.º do certificado energético</label><input id="'+p+'-ce-numero"></div><div class="ff"><label>Validade do certificado energético</label><input id="'+p+'-ce-validade" type="date"></div><div class="ff"><label>Classe energética</label><input id="'+p+'-ce-classe" placeholder="Ex.: B-"></div></div>');}
  if(!document.getElementById(p+'-int-ocupacao')){const cards=[...form.querySelectorAll('.form-card')],conditions=cards.find(x=>x.textContent.includes('Condições do contrato'));if(conditions)conditions.insertAdjacentHTML('afterend',`<div class="form-card v51-internal"><div class="fc-title"><i class="ti ti-building-community"></i>Informação complementar do imóvel <span style="font-size:10px;font-weight:500;color:var(--text-secondary)">— não integra o CMI</span></div><div class="nota inf" style="margin-bottom:12px"><i class="ti ti-info-circle"></i>Estes dados ficam apenas na ficha mestre do imóvel e podem ser usados nas fases seguintes do processo.</div><div class="fg"><div class="ff"><label>Situação de ocupação</label><select id="${p}-int-ocupacao" onchange="v51ToggleExtra('${p}')"><option value="livre">Livre</option><option value="proprietario">Ocupado pelo proprietário</option><option value="arrendado">Arrendado</option><option value="cedido">Cedido</option><option value="outro">Outra situação</option></select></div><div class="ff"><label>Sujeito a condomínio</label><select id="${p}-int-condominio" onchange="v51ToggleExtra('${p}')"><option value="nao">Não</option><option value="sim">Sim</option></select></div><div class="ff v51-rent-${p}" style="display:none"><label>Renda mensal (€)</label><input id="${p}-int-renda" type="number" min="0" step="0.01"></div><div class="ff v51-rent-${p}" style="display:none"><label>Início do arrendamento</label><input id="${p}-int-arrendamento-inicio" type="date"></div><div class="ff v51-rent-${p}" style="display:none"><label>Fim do arrendamento</label><input id="${p}-int-arrendamento-fim" type="date"></div><div class="ff v51-rent-${p}" style="display:none"><label>Renovação automática</label><select id="${p}-int-arrendamento-renovacao"><option value="sim">Sim</option><option value="nao">Não</option></select></div><div class="ff v51-rent-${p}" style="display:none"><label>Caução (€)</label><input id="${p}-int-caucao" type="number" min="0" step="0.01"></div><div class="ff v51-rent-${p}" style="display:none"><label>Rendas em atraso (€)</label><input id="${p}-int-rendas-atraso" type="number" min="0" step="0.01"></div><div class="ff v51-rent-${p}" style="display:none"><label>Entrega no negócio</label><select id="${p}-int-entrega"><option value="arrendatario">Venda com arrendatário</option><option value="livre">Entrega livre de ocupantes</option><option value="definir">A definir</option></select></div><div class="ff v51-cond-${p}" style="display:none"><label>Administrador do condomínio</label><input id="${p}-int-condominio-admin"></div><div class="ff v51-cond-${p}" style="display:none"><label>Contacto do condomínio</label><input id="${p}-int-condominio-contacto"></div><div class="ff v51-cond-${p}" style="display:none"><label>Quota (€)</label><input id="${p}-int-condominio-quota" type="number" min="0" step="0.01"></div><div class="ff v51-cond-${p}" style="display:none"><label>Periodicidade</label><select id="${p}-int-condominio-periodicidade"><option>Mensal</option><option>Trimestral</option><option>Semestral</option><option>Anual</option></select></div><div class="ff v51-cond-${p}" style="display:none"><label>Pago até</label><input id="${p}-int-condominio-pago-ate" type="date"></div><div class="ff v51-cond-${p}" style="display:none"><label>Dívida ao condomínio (€)</label><input id="${p}-int-condominio-divida" type="number" min="0" step="0.01"></div><div class="ff v51-cond-${p}" style="display:none"><label>Quotas extraordinárias / obras</label><input id="${p}-int-condominio-extra"></div><div class="ff"><label>Permilagem</label><input id="${p}-int-permilagem" placeholder="Ex.: 1,5970"></div><div class="ff"><label>Estacionamento / arrecadações</label><input id="${p}-int-dependencias"></div><div class="ff"><label>Atividade atual</label><input id="${p}-int-atividade"></div><div class="ff"><label>Saída de fumos</label><select id="${p}-int-saida-fumos"><option value="desconhecido">Por confirmar</option><option value="sim">Sim</option><option value="nao">Não</option></select></div><div class="ff full"><label>Observações internas</label><textarea id="${p}-int-observacoes" rows="3"></textarea></div></div></div>`);v51ToggleExtra(p);}
  const internal=document.getElementById(p+'-int-ocupacao')?.closest('.v51-internal'),propertyCard=document.getElementById(p+'-im-onus')?.closest('.form-card');
  if(internal&&propertyCard){internal.querySelector('.fc-title').innerHTML='<i class="ti ti-building-community"></i>Situação de ocupação e condomínio <span style="font-size:10px;font-weight:500;color:var(--text-secondary)">— informação interna; não integra automaticamente o texto do CMI</span>';internal.style.display='block';internal.style.marginTop='0';propertyCard.insertAdjacentElement('afterend',internal);}
  setTimeout(()=>v68AssignCmiNumber(id),0);
 };
 window.v43ToggleCommission=function(p){
  const nativePrefix=p+'-cond';
  if(document.getElementById(nativePrefix+'-comissao-fixa-wrap')&&typeof toggleComissaoTipo==='function'){toggleComissaoTipo(nativePrefix);return;}
  const fixed=document.getElementById(p+'-cond-comissao-tipo')?.value==='fixa';
  document.querySelectorAll('.v43-fixed-'+p).forEach(e=>e.style.display=fixed?'block':'none');
  const pct=document.getElementById(p+'-cond-comissao')?.closest('.ff');if(pct)pct.style.display=fixed?'none':'block';
 };
 function v43SyncCommissions(){v43ToggleCommission('cmexcl');v43ToggleCommission('cmabrt')}
 function v61EnsureRal(){['cmexcl','cmabrt'].forEach(p=>{const name=document.getElementById(p+'-of-ral'),site=document.getElementById(p+'-of-ral-site'),forum=document.getElementById(p+'-of-foro');if(name&&!name.value)name.value='Centro de Informação, Mediação e Arbitragem de Consumo (CIAB)';if(site&&!site.value)site.value='https://www.ciab.pt';if(forum&&!forum.value)forum.value='Braga'})}
 window.v43SuggestWords=function(p){
  const value=Number(document.getElementById(p+'-cond-comissao-fixa')?.value)||0,out=document.getElementById(p+'-cond-comissao-fixa-extenso');
  if(out&&!out.dataset.edited)out.value=value?(v39EuroWords(value)+' euros'):'';
 };
 window.v51ToggleExtra=function(p){const rented=document.getElementById(p+'-int-ocupacao')?.value==='arrendado',condo=document.getElementById(p+'-int-condominio')?.value==='sim';document.querySelectorAll('.v51-rent-'+p).forEach(e=>e.style.display=rented?'block':'none');document.querySelectorAll('.v51-cond-'+p).forEach(e=>e.style.display=condo?'block':'none')};
 window.v51ComplementFromData=function(d,p){const out={};Object.entries(d||{}).forEach(([k,v])=>{const start=p+'-int-';if(k.startsWith(start)&&v!==''&&v!==null&&v!==undefined)out[k.slice(start.length).replace(/-/g,'_')]=v});return out};
 const baseSelectProperty=selIm;selIm=function(ref){baseSelectProperty(ref);const f=fichas[ref],c=f?.complementar,box=document.getElementById('f-info');if(!box||!c||!Object.keys(c).length)return;const labels={ocupacao:'Ocupação',renda:'Renda mensal',arrendamento_inicio:'Início do arrendamento',arrendamento_fim:'Fim do arrendamento',arrendamento_renovacao:'Renovação',caucao:'Caução',rendas_atraso:'Rendas em atraso',entrega:'Entrega no negócio',condominio:'Condomínio',condominio_admin:'Administrador',condominio_contacto:'Contacto do condomínio',condominio_quota:'Quota de condomínio',condominio_periodicidade:'Periodicidade',condominio_pago_ate:'Condomínio pago até',condominio_divida:'Dívida ao condomínio',condominio_extra:'Quotas/obras extraordinárias',permilagem:'Permilagem',dependencias:'Dependências',atividade:'Atividade atual',saida_fumos:'Saída de fumos',observacoes:'Observações internas'},money=new Set(['renda','caucao','rendas_atraso','condominio_quota','condominio_divida']);box.insertAdjacentHTML('beforeend','<div style="margin-top:14px;padding-top:10px;border-top:1px solid var(--border-tertiary);font-weight:650;color:var(--green-dark)">Informação complementar</div>'+Object.entries(c).filter(([,v])=>v!==''&&v!==null&&v!==undefined).map(([k,v])=>'<div class="inf-row"><span class="inf-l">'+v2Esc(labels[k]||k)+'</span><span class="inf-v">'+v2Esc(money.has(k)?fmtEurNumero(Number(v)||0):String(v))+'</span></div>').join(''))};
 const baseOfficial=v39OfficialCmi;
 v39OfficialCmi=function(d,tipo){
  let html=baseOfficial(d,tipo);
  const clean=document.createElement('div');clean.innerHTML=html;clean.querySelectorAll('.doc-header').forEach(header=>header.remove());html=clean.innerHTML;
  if(d._v39Deposit===true)return html;
  const p=tipo==='excl'?'cmexcl':'cmabrt',mode=d[p+'-cond-comissao-tipo']||'percentagem',pct=v39Get(d,p+'-cond-comissao','___'),iva=(v39Get(d,p+'-cond-ivacond','23%').match(/[\d,.]+/)||['___'])[0];
  const fixed=Number(d[p+'-cond-comissao-fixa'])||0,fixedWords=v39Get(d,p+'-cond-comissao-fixa-extenso',fixed?v39EuroWords(fixed)+' euros':'________________________________');
  const fraction=v39Get(d,p+'-im-fracao','');if(fraction)html=html.replace(', e inscrito na matriz predial urbana/rústica',', correspondente à fração autónoma <strong>'+v2Esc(fraction)+'</strong>, e inscrito na matriz predial urbana/rústica');
  const percentLine=(mode==='percentagem'?'☒':'☐')+' A quantia de <strong>'+v2Esc(pct)+'% ('+percentagemPorExtenso(pct)+' por cento)</strong>, calculada sobre o preço pelo qual o negócio é efetivamente concretizado, acrescida de IVA à taxa legal de <strong>'+v2Esc(iva)+'%</strong>.';
  const fixedLine=(mode==='fixa'?'☒':'☐')+' A quantia de <strong>'+(fixed?fmtEurNumero(fixed):'_________________ Euros')+' ('+v2Esc(fixedWords)+')</strong>, acrescida de IVA à taxa legal de <strong>'+v2Esc(iva)+'%</strong>.';
  html=html.replace(/<p>2\. O Segundo Contratante obriga-se a pagar à Mediadora, a título de remuneração,[\s\S]*?<\/p>/,'<p>2. O Segundo Contratante obriga-se a pagar à Mediadora, a título de remuneração:<br>'+percentLine+'<br><strong>OU</strong><br>'+fixedLine+'</p>');
  html=html.replace(/(\([^()<>]+\))(?: \1)+/g,'$1');
  const raw=d[p+'-cond-datainicio'],dt=raw?new Date(raw+'T12:00:00'):new Date(),longDate=dt.toLocaleDateString('pt-PT',{day:'numeric',month:'long',year:'numeric'});
  html=html.replace(/<div class="doc-data-local">\s*____________________,\s*_____\s+de\s+________________\s+de\s+_____\.\s*<\/div>/,'<div class="doc-data-local">____________________, '+v2Esc(longDate)+'.</div>');
  return html;
 };
 const baseFinalize=finalizarContrato;
 finalizarContrato=async function(id){
  if(['cm-excl','cm-abrt'].includes(id)){
   const p=id==='cm-excl'?'cmexcl':'cmabrt',today=new Date(),local=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10),field=document.getElementById(p+'-cond-datainicio');
   if(field&&!field.value)field.value=local;
  }
  return baseFinalize(id);
 };
 window.v44NewContract=function(id,title,subtitle){
  if(!['cm-excl','cm-abrt'].includes(id))return go(id,title,subtitle);
  if(typeof v70EditingCmiId!=='undefined')v70EditingCmiId=null;
  v66EditingCmiId=null;
  v2ContractSourceImovelId=null;
  const form=document.getElementById('form-'+id);
  if(form){form.innerHTML='';[...form.attributes].filter(a=>a.name.startsWith('data-')).forEach(a=>form.removeAttribute(a.name));}
  go(id,title,subtitle);
 };
 let v66EditingCmiId=null;
 const v43EditContractBase=editarContratoBib;
 editarContratoBib=function(cid){
  const contract=v2FindContract(cid);v66EditingCmiId=contract&&['cm-excl','cm-abrt'].includes(contract.tipo)?contract.db_id:null;
  const result=v43EditContractBase(cid);
  [50,250,600,1200].forEach(ms=>setTimeout(()=>{v43SyncCommissions();v61EnsureRal();if(v66EditingCmiId){const form=document.getElementById('form-'+contract.tipo),save=form?.querySelector('button[onclick*="finalizarContrato"]'),draft=form?.querySelector('button[onclick*="guardarRascunho"]');if(save)save.innerHTML='<i class="ti ti-device-floppy"></i>Guardar alterações';if(draft)draft.style.display='none';const subtitle=document.getElementById('tbs');if(subtitle)subtitle.textContent='A editar '+(contract.document_ref||'CMI')+' — será atualizado sem criar nova versão'}},ms));
  return result;
 };
 const v66SaveContractBase=v2SaveContract;
 v2SaveContract=async function(id,estado){
  if(!v66EditingCmiId||!['cm-excl','cm-abrt'].includes(id))return v66SaveContractBase(id,estado);
  const contract=v2FindContract(v66EditingCmiId);if(!contract)return v66SaveContractBase(id,estado);
  const d=recolherDados(id),err=typeof v21ValidateCMI==='function'?v21ValidateCMI(id,d):null;if(err){mostrarToast(err,'err');return}
  const p=id==='cm-excl'?'cmexcl':'cmabrt',summary=extrairResumo(id,d),fixed=d[p+'-cond-comissao-tipo']==='fixa',fixedValue=Number(d[p+'-cond-comissao-fixa'])||0,pct=Number(d[p+'-cond-comissao'])||0,complement=v51ComplementFromData(d,p);
  try{
   const db=await supa.from('contratos').select('*').eq('id',contract.db_id).single();if(db.error)throw db.error;
   const snapshot={...(db.data.snapshot||{}),partes:{vendedores:d._outorgantes_vend||[],compradores:d._outorgantes_comp||[]},gerado_em:new Date().toISOString()};
   const updated=await supa.from('contratos').update({titulo:`${tipoLabels[id]||id} — ${summary.morada}`,morada:summary.morada,partes:summary.partes,dados:d,snapshot,estado:'finalizado'}).eq('id',contract.db_id).select('*').single();if(updated.error)throw updated.error;
   if(contract.imovel_id){
    const old=await supa.from('imoveis').select('dados_json').eq('id',contract.imovel_id).single();if(old.error)throw old.error;
    const propertyData={...(old.data?.dados_json||{}),complementar_imovel:complement,remuneracao:{tipo:fixed?'fixa':'percentagem',valor_fixo:fixedValue,percentagem:pct}};
    const property=await supa.from('imoveis').update({morada:d[p+'-im-morada']||'',tipologia:d[p+'-im-tipologia']||'',preco:Number(d[p+'-im-valor'])||0,regime:id==='cm-excl'?'Exclusivo':'Não exclusivo',artigo:d[p+'-im-artigo']||'',desc_predial:d[p+'-im-descpred']||'',finalidade:d[p+'-im-finalidade']||'',onus:d[p+'-im-onus']||'',comissao_pct:fixed?0:pct,iva_pct:(d[p+'-cond-ivacond']||'23%').includes('23')?23:0,cmi_inicio:d[p+'-cond-datainicio']||null,dados_json:propertyData}).eq('id',contract.imovel_id);if(property.error)throw property.error;
   }
   mostrarToast('A atualizar o CMI e o PDF...','info');await v2UploadPdf(updated.data,d);v66EditingCmiId=null;v2ContractSourceImovelId=null;await Promise.all([v2LoadContratos(),v2LoadImoveis()]);renderDash();contratoAtual=id;v2ContratoPreviewId=contract.db_id;document.getElementById('modal-title').textContent=`${contract.document_ref} · ${updated.data.titulo}`;document.getElementById('modal-body').innerHTML=v2HtmlFromData(id,d);document.getElementById('modal-preview').style.display='flex';mostrarToast('CMI atualizado sem criar nova versão.','ok');return updated.data;
  }catch(e){console.error(e);mostrarToast('Erro ao atualizar o CMI: '+(e.message||e),'err')}
 };
 document.addEventListener('click',()=>setTimeout(v43SyncCommissions,120),true);
 document.addEventListener('focusin',v43SyncCommissions,true);
 window.v67DeleteFinalContract=async function(cid){
  const c=v2FindContract(cid);if(!c||c.estado!=='finalizado')return;
  if(!confirm('Eliminar definitivamente '+(c.document_ref||'este contrato')+' e o respetivo PDF? A ficha do imóvel e as restantes versões não serão apagadas.'))return;
  try{const del=await supa.from('contratos').delete().eq('id',c.db_id);if(del.error)throw del.error;if(c.pdf_path){const storage=await supa.storage.from('lyvcmi-docs').remove([c.pdf_path]);if(storage.error)console.warn('PDF já não existia ou não pôde ser removido',storage.error)}await v2LoadContratos();renderDash();mostrarToast('Versão eliminada.','ok')}catch(e){console.error(e);mostrarToast('Não foi possível eliminar: '+(e.message||e),'err')}
 };
 const v67RenderLibraryBase=renderBibLista;
 renderBibLista=function(){
  v67RenderLibraryBase();
  document.querySelectorAll('#bib-lista .bib-card').forEach(card=>{const view=card.querySelector('button[onclick^="abrirContratoBib"]'),match=view?.getAttribute('onclick')?.match(/'([^']+)'/),c=match?v2FindContract(match[1]):null;if(!c)return;const edit=[...card.querySelectorAll('button')].find(b=>b.textContent.includes('Editar'));if(edit&&['cm-excl','cm-abrt'].includes(c.tipo))edit.innerHTML='<i class="ti ti-edit"></i>Editar';if(c.estado==='finalizado'&&!card.querySelector('.v67-delete')){const button=document.createElement('button');button.className='btn v67-delete';button.style.color='var(--red)';button.innerHTML='<i class="ti ti-trash"></i>Eliminar';button.onclick=()=>v67DeleteFinalContract(c.db_id);card.querySelector('.bib-acoes')?.appendChild(button)}});
 };
 const v68NumberPromises={};
 function v68NumberInfo(id){const year=new Date().getFullYear(),prefix=(id==='cm-excl'?'CMIE':'CMINE')+year,p=id==='cm-excl'?'cmexcl':'cmabrt';return{year,prefix,p,fieldId:p+'-of-numero'}}
 async function v68AssignCmiNumber(id,force=false){
  if(!['cm-excl','cm-abrt'].includes(id))return'';
  const info=v68NumberInfo(id),field=document.getElementById(info.fieldId);if(!field)return'';field.readOnly=true;field.title='Numeração automática do CMI';
  if(v66EditingCmiId)return field.value;
  const valid=new RegExp('^'+info.prefix+'\\d{4}$');if(!force&&valid.test(String(field.value||'')))return field.value;
  if(v68NumberPromises[id])return v68NumberPromises[id];
  v68NumberPromises[id]=(async()=>{try{const result=await supa.from('contratos').select('dados').eq('agencia_id',currentAgenciaId).eq('tipo',id);if(result.error)throw result.error;let max=0;(result.data||[]).forEach(row=>{const value=String(row.dados?.[info.fieldId]||'');if(valid.test(value))max=Math.max(max,Number(value.slice(-4))||0)});const number=info.prefix+String(max+1).padStart(4,'0');field.value=number;field.dispatchEvent(new Event('input',{bubbles:true}));return number}catch(e){console.error(e);mostrarToast('Não foi possível obter o próximo número do CMI.','err');return field.value}finally{delete v68NumberPromises[id]}})();
  return v68NumberPromises[id];
 }
 const v68SaveContractBase=v2SaveContract;
 v2SaveContract=async function(id,estado){if(['cm-excl','cm-abrt'].includes(id)&&!v66EditingCmiId)await v68AssignCmiNumber(id,estado==='finalizado');return v68SaveContractBase(id,estado)};
 let v68LibraryView=localStorage.getItem('lyvcmi-library-view')||'cards';
 window.v68SetLibraryView=function(mode){v68LibraryView=mode==='list'?'list':'cards';localStorage.setItem('lyvcmi-library-view',v68LibraryView);renderBibLista()};
 function v68CmiNumber(c){const p=c.tipo==='cm-excl'?'cmexcl':c.tipo==='cm-abrt'?'cmabrt':'';return p?c.dados?.[p+'-of-numero']||c.document_ref||'—':c.document_ref||'—'}
 function v68FirstOwner(c){return c.dados?._outorgantes_vend?.[0]?.nome||c.snapshot?.partes?.vendedores?.[0]?.nome||String(c.partes||'').split(/\s+[·|]\s+|,/)[0]||'—'}
 function v68EnsureLibraryControls(){const bar=document.getElementById('v25-bib-filters');if(!bar||document.getElementById('v68-library-view'))return;const controls=document.createElement('div');controls.id='v68-library-view';controls.className='v68-view-controls';controls.innerHTML='<label>Visualização</label><div><button type="button" class="btn" data-view="cards" onclick="v68SetLibraryView(\'cards\')"><i class="ti ti-layout-grid"></i>Cartões</button><button type="button" class="btn" data-view="list" onclick="v68SetLibraryView(\'list\')"><i class="ti ti-list"></i>Lista</button></div>';bar.appendChild(controls)}
 const v68RenderLibraryBase=renderBibLista;
 renderBibLista=function(){
  v68RenderLibraryBase();v68EnsureLibraryControls();const list=document.getElementById('bib-lista');if(!list)return;list.classList.toggle('v68-list-view',v68LibraryView==='list');document.querySelectorAll('#v68-library-view button').forEach(b=>b.classList.toggle('p',b.dataset.view===v68LibraryView));
  document.querySelectorAll('#bib-lista .bib-card').forEach(card=>{const view=card.querySelector('button[onclick^="abrirContratoBib"]'),match=view?.getAttribute('onclick')?.match(/'([^']+)'/),c=match?v2FindContract(match[1]):null;if(!c||card.querySelector('.v68-cmi-key'))return;const target=card.querySelector('.bib-meta');if(!target)return;const key=document.createElement('div');key.className='v68-cmi-key';key.innerHTML='<span><small>Número CMI</small><strong>'+v2Esc(v68CmiNumber(c))+'</strong></span><span><small>1.º outorgante</small><strong>'+v2Esc(v68FirstOwner(c))+'</strong></span>';target.insertAdjacentElement('beforebegin',key)});
 };
 const v68Style=document.createElement('style');v68Style.id='v68-library-css';v68Style.textContent=`.v68-view-controls{margin-left:auto;display:flex;flex-direction:column;gap:5px}.v68-view-controls label{font-size:11px;color:var(--text-secondary)}.v68-view-controls>div{display:flex;gap:5px}.v68-cmi-key{display:grid;grid-template-columns:minmax(145px,.7fr) minmax(190px,1.3fr);gap:12px;margin:9px 0}.v68-cmi-key span{display:flex;flex-direction:column;gap:2px}.v68-cmi-key small{font-size:10px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.035em}.v68-cmi-key strong{font-size:12px;color:var(--text-primary)}#bib-lista.v68-list-view{display:flex;flex-direction:column;gap:6px}#bib-lista.v68-list-view .bib-card{display:grid;grid-template-columns:minmax(230px,1.1fr) minmax(300px,1fr) auto;column-gap:18px;align-items:center;padding:11px 14px}#bib-lista.v68-list-view .bib-card-top{grid-column:1}#bib-lista.v68-list-view .v68-cmi-key{grid-column:2;grid-row:1;margin:0}#bib-lista.v68-list-view .bib-meta{grid-column:1/3;margin-top:6px}#bib-lista.v68-list-view .bib-acoes{grid-column:3;grid-row:1/3;justify-content:flex-end}@media(max-width:900px){.v68-view-controls{margin-left:0}#bib-lista.v68-list-view .bib-card{display:block}.v68-cmi-key{grid-template-columns:1fr}.v68-view-controls button{padding:8px}}`;document.head.appendChild(v68Style);
 if(typeof v41Set==='function')v41Set=function(id,value){const e=document.getElementById(id);if(!e||value===undefined||value===null||value===''||String(e.value||'').trim())return;let v=String(value).trim();if(e.type==='number'){const n=v.replace(/\s/g,'').replace(',','.').match(/-?\d+(?:\.\d+)?/);v=n?n[0]:'';}if(e.tagName==='SELECT'&&id.endsWith('-im-tipologia')){const t=v.toUpperCase().match(/T\d\+?/);if(t)v=t[0];}if(!v)return;e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));};
 if(typeof v41ApplyCmiProperty==='function')v41ApplyCmiProperty=function(p,rows){const m=v40Map(rows),map={morada_imovel:'-im-morada',artigo_matricial:'-im-artigo',descricao_predial:'-im-descpred',fracao_autonoma:'-im-fracao',andar_divisao:'-im-andar',freguesia:'-of-freguesia',concelho:'-of-concelho',conservatoria:'-of-conservatoria',natureza:'-of-natureza',destino:'-of-destino',divisoes:'-of-divisoes',licenca_numero:'-of-licenca',licenca_data:'-of-licenca-data',camara:'-of-camara',certificado_energetico_numero:'-ce-numero',certificado_energetico_validade:'-ce-validade',classe_energetica:'-ce-classe'};if(m.descricao_predial&&(!/^\s*[A-Z0-9./-]{1,40}\s*$/i.test(m.descricao_predial)||m.descricao_predial.split(/\s+/).length>3))delete m.descricao_predial;if(m.conservatoria)m.conservatoria=String(m.conservatoria).replace(/^Conservat[oó]ria do Registo Predial (?:de|da)\s+/i,'').replace(/\s+(?:sob o )?(?:registo|n\.?º).*$/i,'').trim();if(m.fracao_autonoma)m.natureza='Fração autónoma';Object.entries(map).forEach(([k,s])=>v41Set(p+s,m[k]));if(m.area_bruta_privativa){const area=document.getElementById(p+'-of-area'),n=String(m.area_bruta_privativa).replace(/\s/g,'').replace(',','.').match(/\d+(?:\.\d+)?/);if(area&&n){area.value=n[0];area.dispatchEvent(new Event('input',{bubbles:true}));}}else v41Set(p+'-of-area',m.area_total);if(m.tipologia){v41Set(p+'-im-tipologia',m.tipologia);if(!m.divisoes)v41Set(p+'-of-divisoes',String(m.tipologia).replace(/[^0-9]/g,''));}};
 function v43EnhanceVisibleForms(){
  ['cm-excl','cm-abrt'].forEach(id=>{if(document.getElementById('form-'+id))v39EnhanceOfficialCmi(id)});
  v61EnsureRal();
  setTimeout(v43SyncCommissions,250);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',v43EnhanceVisibleForms);
 else v43EnhanceVisibleForms();
 setTimeout(v43EnhanceVisibleForms,300);
 setTimeout(v43EnhanceVisibleForms,1200);
 setTimeout(()=>{if(document.getElementById('pg-biblioteca')?.classList.contains('on'))renderBibLista()},1300);
})();
