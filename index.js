var head = document.head

var loadsModules = {}

var PAGES = {}

var endloader = document.getElementsByTagName('endloader')[0]

var miniVars = {}

class WINDOW {
    static window

    set static html(value){
        WINDOW.html = value
        console.log(value);
    }
}

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



window.onload = () => {
    
    document.getElementsByTagName('body')[0].innerHTML += `<window></window>`
    WINDOW.window = document.getElementsByTagName('window')[0]
    
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
                    PAGE_MANAGER.PAGES[element.attributes.name.value] = element.attributes.src.value
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
        
    }
    var loadsScripts = setInterval((jss,lm)=>{
        if (Object.values(lm).indexOf(false) == -1) {
            for (let i = 0; i < jss.length; i++) {
                const js = jss[i];
                IMPORT(js)
            }
            clearInterval(loadsScripts)
            PAGE_MANAGER.OPEN_PAGE(location.search!=""?location.search.replace("?","").split("=")[1]:"index")
        }

    },500,jss,loadsModules)

    
}


function IMPORT(file) {
    let sc = document.createElement('script')
    sc.src = file
    endloader.appendChild(sc)
}

class PAGE_MANAGER {
    static PAGES = {}

    static PAGES_LOADING = {}

    static CREATE_PAGE(name,html=()=>{},elements=()=>{}){
        PAGE_MANAGER.PAGES_LOADING[name] = {
            "html":html,
            "elements":elements
        }
    }

    static OPEN_PAGE(name){
        var OP = setInterval((name,O)=>{
            if (Object.hasOwn(PAGE_MANAGER.PAGES_LOADING,name)) {
                PAGE_MANAGER.PAGES_LOADING[name].elements()
                PAGE_MANAGER.PAGES_LOADING[name].html()
                clearInterval(OP)
            }
        },250,name,OP)
        
    }

}