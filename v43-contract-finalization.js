/* LYV.CMI V4.3 — data de finalização e remuneração fixa por extenso. */
(function(){
 const baseEnhance=v39EnhanceOfficialCmi;
 v39EnhanceOfficialCmi=function(id){
  baseEnhance(id);if(!['cm-excl','cm-abrt'].includes(id))return;
  const p=id==='cm-excl'?'cmexcl':'cmabrt',form=document.getElementById('form-'+id);
  if(!form||document.getElementById(p+'-cond-comissao-tipo'))return;
  const commission=document.getElementById(p+'-cond-comissao')?.closest('.ff');if(!commission)return;
  commission.insertAdjacentHTML('beforebegin','<div class="ff"><label>Tipo de remuneração</label><select id="'+p+'-cond-comissao-tipo" onchange="v43ToggleCommission(\''+p+'\')"><option value="percentagem">Percentagem</option><option value="fixa">Valor fixo</option></select></div>');
  commission.insertAdjacentHTML('afterend','<div class="ff v43-fixed-'+p+'" style="display:none"><label>Comissão fixa (€)</label><input id="'+p+'-cond-comissao-fixa" type="number" min="0" step="0.01" oninput="v43SuggestWords(\''+p+'\')"></div><div class="ff v43-fixed-'+p+'" style="display:none"><label>Comissão fixa por extenso</label><input id="'+p+'-cond-comissao-fixa-extenso" placeholder="Ex.: cinco mil euros"></div>');
  v43ToggleCommission(p);
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
 function v43EnhanceVisibleForms(){
  ['cm-excl','cm-abrt'].forEach(id=>{if(document.getElementById('form-'+id))v39EnhanceOfficialCmi(id)});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',v43EnhanceVisibleForms);
 else v43EnhanceVisibleForms();
 setTimeout(v43EnhanceVisibleForms,300);
 setTimeout(v43EnhanceVisibleForms,1200);
})();
