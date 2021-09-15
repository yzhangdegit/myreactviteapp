const common= require('./webpack.common.config')
const findLoader=(name,config = common)=>{
  let loader = config.module.rules.find(r=>r.loader === name)
  if(!loader){
      config.module.rules.forEach(r=>{
          if(Array.isArray(r.use)){
              loader = r.use.find(u=>typeof u === 'object' && u.loader === name)
          }
      })
  }
  return loader
}

const findPlugin = (name,config=common)=>{
    return config.plugins.find(p=>p.constructor.name === name)
}

const mergeLoaderOptions = (name,options,config=common)=>{
    let loader = findLoader(name,config)
    if(loader){
        loader.options= {
            ...loader.options,
            ...options
        }
    }
}

const mergePluginOptions = (name,options,config=common)=>{
    let plugin = findPlugin(name,config)
    if(plugin){
        plugin.useOptions = {
            ...plugin.useOptions,
            ...options
        }
    }
}
function snakeCase(s) {
    const result = s
      .replace(/(?:^|\.?)([A-Z])/g, (x, y) => '-' + y.toLowerCase())
      .replace(/^-/, '');
    return result;
  }
  module.exports ={
      findLoader,
      findPlugin,
      mergeLoaderOptions,
      mergePluginOptions,
      snakeCase
  }