var head = document.head
head.innerHTML += `<style>
import, load, endloader{
    display:none;
}
window{
    display:block;
    padding:0px;
    margin:0px;
    position:relative;
}
body,html{
    padding:0px;
    margin:0px;
}
</style>`

var loadsModules = {

}


var PAGES = {
    
}


var endloader = document.getElementsByTagName('endloader')[0]

var miniVars = {}

var WINDOW 


window.onload = () => {
    
    document.getElementsByTagName('body')[0].innerHTML += `<window></window>`
    WINDOW = document.getElementsByTagName('window')[0]
    
    let loads = document.getElementsByTagName('load')
    
    endloader = document.getElementsByTagName('endloader')[0]
    
    let jss = []

    for (var i = 0; i < loads.length; i++) {
        let load = loads[i]
        for (let el = 0; el < load.children.length; el++) {
            let element = load.children[el]
            
            console.log(element);
            switch (element.tagName) {
                case "PAGE":
                    PAGES[element.attributes.name.value] = element.attributes.src.value
                    break;
                
                case "MODULE":
                    loadsModules[element.attributes.name.value]=false
                    IMPORT("https://diodr.github.io/module/module/"+element.attributes.name.value+".js")
                    break;

                case "JS":
                    jss[jss.length]=element.attributes.src.value
                    break
                
                default:
                    break;
            }
            
        }
        
        
        
        //endloader.appendChild(resource)
        
    }
    
    var loadsScripts = setInterval((jss,lm)=>{
        if (Object.values(lm).indexOf(false) == -1) {
            for (let i = 0; i < jss.length; i++) {
                const js = jss[i];
                IMPORT(js)
            }
            clearInterval(loadsScripts)

        }

    },500,jss,loadsModules)
}


function IMPORT(file) {
    let sc = document.createElement('script')
    sc.src = file
    endloader.appendChild(sc)
}
