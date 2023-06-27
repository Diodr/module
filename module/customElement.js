loadsModules["customElement"]=true


// class NEW_ELEMENT extends HTMLElement {




//   disconnectedCallback() {
//     // браузер вызывает этот метод при удалении элемента из документа
//     // (может вызываться много раз, если элемент многократно добавляется/удаляется)
//   }



//   attributeChangedCallback(name, oldValue, newValue) {
//     // вызывается при изменении одного из перечисленных выше атрибутов
//   }

//   adoptedCallback() {
//     // вызывается, когда элемент перемещается в новый документ
//     // (происходит в document.adoptNode, используется очень редко)
//   }


// }

class MyElements {
  static createNewElement(NameElement,html,attributs=[],...args){
    
    eval(`class ELEM extends HTMLElement {
      allAtr = ${JSON.stringify(attributs)}
      inhtml = '${html}'

      connectedCallback() {
        this.innerHTML = this.inhtml
      }
      static get observedAttributes() {
        return allAtributes();
      }

      allAtributes(){
        return this.allAtr
      }
    }

    if(customElements.get((NameElement.search("-")!=-1?NameElement :("my-"+NameElement)))){
      customElements.upgrade((NameElement.search("-")!=-1?NameElement :("my-"+NameElement)),ELEM)
    } else {
      customElements.define((NameElement.search("-")!=-1?NameElement :("my-"+NameElement)),ELEM)
    }
    `)
    
  }
}



