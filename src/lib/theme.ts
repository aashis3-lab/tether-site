export const THEME_KEY = "tether-site.theme";

/**
 * Runs inline in <head> before first paint: a saved choice wins, otherwise the system
 * setting, and it keeps following the system until the visitor picks one.
 */
export const themeScript = `(function(){
var k=${JSON.stringify(THEME_KEY)},r=document.documentElement,m=window.matchMedia('(prefers-color-scheme: dark)');
function saved(){try{var v=localStorage.getItem(k);return v==='light'||v==='dark'?v:null}catch(e){return null}}
function apply(){var t=saved()||(m.matches?'dark':'light');r.dataset.theme=t;var c=document.querySelector('meta[name="theme-color"]');if(c)c.setAttribute('content',t==='dark'?'#120d0f':'#fbf9f8')}
apply();
m.addEventListener('change',function(){if(!saved())apply()});
})();`;
