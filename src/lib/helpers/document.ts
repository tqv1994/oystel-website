export const documentHelper = {
    changeBackgroundHeader: function(color = 'transparent'){
        var headerEl = document.getElementById('header');
        
        if (typeof headerEl != 'undefined' && headerEl != null) {
                if(headerEl.classList.contains('light')){
                    headerEl.classList.remove('light');
                    headerEl.classList.add('dark');
                    headerEl.classList.add('changed');
                }else{
                    if(headerEl.classList.contains('changed')){
                        headerEl.classList.remove('dark');
                        headerEl.classList.remove('changed');
                        headerEl.classList.add('light');
                    }
                }
            
                headerEl.style.backgroundColor = color;
        }
    },

    handleEqualHeightItems: function(items: string[]){
        let height = 0;
        for(let i=0; i < items.length; i++){
            let item = items[i];
            let el = document.querySelector(item);
            if(typeof el !== "undefined" && el !== null){
                if(i == 0){
                    height = el.offsetHeight;
                }else{
                    el.style.height = height+'px';
                }
            }
            
        }
    }
};