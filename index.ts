const H={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type"};
const SYS=`Eres un calculador de calorías para una app personal. Recibes en español lo que la persona ha comido. Devuelve SOLO JSON: {"items":[{"n":"alimento","q":"cantidad interpretada","k":kcal_entero}]}.
Interpreta medidas caseras (puñado, cucharada sopera/postre/café, vaso, taza, tazón, loncha, rebanada, ración, chorrito, pizca...) según el alimento, con equivalencias domésticas y valores nutricionales de referencia (BEDCA/USDA). Considera cocinado/crudo/frito y aceites o salsas mencionados. Si dudas, estima razonablemente y añade "aprox." en q. Nunca moralices ni recomiendes compensar o restringir.`;
Deno.serve(async r=>{
  if(r.method=="OPTIONS")return new Response("ok",{headers:H});
  try{
    const {text}=await r.json();
    const a=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":Deno.env.get("ANTHROPIC_API_KEY")!,"anthropic-version":"2023-06-01","content-type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-5-5",max_tokens:1000,system:SYS,messages:[{role:"user",content:String(text).slice(0,2000)}]})});
    const j=await a.json();
    const out=(j.content?.[0]?.text||"").replace(/```json|```/g,"").trim();
    return new Response(out,{headers:{...H,"content-type":"application/json"}});
  }catch(e){return new Response(JSON.stringify({error:String(e)}),{status:500,headers:H})}
});
