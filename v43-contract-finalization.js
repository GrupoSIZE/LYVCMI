/* LYV.CMI V4.3 — data de finalização e remuneração fixa por extenso. */
(function(){
 const baseEnhance=v39EnhanceOfficialCmi;
 v39EnhanceOfficialCmi=function(id){
  baseEnhance(id);if(!['cm-excl','cm-abrt'].includes(id))return;
  const p=id==='cm-excl'?'cmexcl':'cmabrt',form=document.getElementById('form-'+id);if(!form)return;
  if(!document.getElementById(p+'-cond-comissao-tipo')){
   const commission=document.getElementById(p+'-cond-comissao')?.closest('.ff');
   if(commission){commission.insertAdjacentHTML('beforebegin','<div class="ff"><label>Tipo de remuneração</label><select id="'+p+'-cond-comissao-tipo" onchange="v43ToggleCommission(\''+p+'\')"><option value="percentagem">Percentagem</option><option value="fixa">Valor fixo</option></select></div>');commission.insertAdjacentHTML('afterend','<div class="ff v43-fixed-'+p+'" style="display:none"><label>Comissão fixa (€)</label><input id="'+p+'-cond-comissao-fixa" type="number" min="0" step="0.01" oninput="v43SuggestWords(\''+p+'\')"></div><div class="ff v43-fixed-'+p+'" style="display:none"><label>Comissão fixa por extenso</label><input id="'+p+'-cond-comissao-fixa-extenso" placeholder="Ex.: cinco mil euros"></div>');v43ToggleCommission(p);}
  }
  if(!document.getElementById(p+'-ce-numero')){const official=document.getElementById(p+'-of-area')?.closest('.form-card');if(official)official.insertAdjacentHTML('beforeend','<div class="fg" style="margin-top:10px"><div class="ff"><label>Fração autónoma</label><input id="'+p+'-im-fracao" placeholder="Ex.: FD"></div><div class="ff"><label>Andar / divisão</label><input id="'+p+'-im-andar"></div><div class="ff"><label>N.º do certificado energético</label><input id="'+p+'-ce-numero"></div><div class="ff"><label>Validade do certificado energético</label><input id="'+p+'-ce-validade" type="date"></div><div class="ff"><label>Classe energética</label><input id="'+p+'-ce-classe" placeholder="Ex.: B-"></div></div>');}
 };
 window.v43ToggleCommission=function(p){
  const fixed=document.getElementById(p+'-cond-comissao-tipo')?.value==='fixa';
  document.querySelectorAll('.v43-fixed-'+p).forEach(e=>e.style.display=fixed?'block':'none');
  const pct=document.getElementById(p+'-cond-comissao')?.closest('.ff');if(pct)pct.style.display=fixed?'none':'block';
 };
 window.v43SuggestWords=function(p){
  const value=Number(document.getElementById(p+'-cond-comissao-fixa')?.value)||0,out=document.getElementById(p+'-cond-comissao-fixa-extenso');
  if(out&&!out.dataset.edited)out.value=value?(v39EuroWords(value)+' euros'):'';
 };
 const baseOfficial=v39OfficialCmi;
 v39OfficialCmi=function(d,tipo){
  let html=baseOfficial(d,tipo);if(d._v39Deposit===true)return html;
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
   if(field)field.value=local;
  }
  return baseFinalize(id);
 };
 window.v44NewContract=function(id,title,subtitle){
  if(!['cm-excl','cm-abrt'].includes(id))return go(id,title,subtitle);
  v2ContractSourceImovelId=null;
  const form=document.getElementById('form-'+id);
  if(form){form.innerHTML='';[...form.attributes].filter(a=>a.name.startsWith('data-')).forEach(a=>form.removeAttribute(a.name));}
  go(id,title,subtitle);
 };
 if(typeof v41Set==='function')v41Set=function(id,value){const e=document.getElementById(id);if(!e||value===undefined||value===null||value===''||String(e.value||'').trim())return;let v=String(value).trim();if(e.type==='number'){const n=v.replace(/\s/g,'').replace(',','.').match(/-?\d+(?:\.\d+)?/);v=n?n[0]:'';}if(e.tagName==='SELECT'&&id.endsWith('-im-tipologia')){const t=v.toUpperCase().match(/T\d\+?/);if(t)v=t[0];}if(!v)return;e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));};
 if(typeof v41ApplyCmiProperty==='function')v41ApplyCmiProperty=function(p,rows){const m=v40Map(rows),map={morada_imovel:'-im-morada',artigo_matricial:'-im-artigo',descricao_predial:'-im-descpred',fracao_autonoma:'-im-fracao',andar_divisao:'-im-andar',freguesia:'-of-freguesia',concelho:'-of-concelho',conservatoria:'-of-conservatoria',natureza:'-of-natureza',destino:'-of-destino',divisoes:'-of-divisoes',licenca_numero:'-of-licenca',licenca_data:'-of-licenca-data',camara:'-of-camara',certificado_energetico_numero:'-ce-numero',certificado_energetico_validade:'-ce-validade',classe_energetica:'-ce-classe'};if(m.descricao_predial&&(!/^\s*[A-Z0-9./-]{1,40}\s*$/i.test(m.descricao_predial)||m.descricao_predial.split(/\s+/).length>3))delete m.descricao_predial;if(m.conservatoria)m.conservatoria=String(m.conservatoria).replace(/^Conservat[oó]ria do Registo Predial (?:de|da)\s+/i,'').replace(/\s+(?:sob o )?(?:registo|n\.?º).*$/i,'').trim();if(m.fracao_autonoma)m.natureza='Fração autónoma';Object.entries(map).forEach(([k,s])=>v41Set(p+s,m[k]));v41Set(p+'-of-area',m.area_bruta_privativa||m.area_total);if(m.tipologia){v41Set(p+'-im-tipologia',m.tipologia);if(!m.divisoes)v41Set(p+'-of-divisoes',String(m.tipologia).replace(/[^0-9]/g,''));}};
 function v43EnhanceVisibleForms(){
  ['cm-excl','cm-abrt'].forEach(id=>{if(document.getElementById('form-'+id))v39EnhanceOfficialCmi(id)});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',v43EnhanceVisibleForms);
 else v43EnhanceVisibleForms();
 setTimeout(v43EnhanceVisibleForms,300);
 setTimeout(v43EnhanceVisibleForms,1200);
})();
