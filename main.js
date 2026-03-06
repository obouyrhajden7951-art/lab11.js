console.log("===== PARTIE 1 : PRINCIPES FP =====");

// fonction impure
let compteur = 0;
function incrementerImpur(){
    compteur++;
}

incrementerImpur();
console.log("compteur (impur):", compteur);

// fonction pure
const incrementerPur = x => x + 1;

console.log("incrementerPur(5):", incrementerPur(5));


// immutabilité tableau
const ajouter = (arr,x) => [...arr,x];

const retirerIndex = (arr,i) =>
[
...arr.slice(0,i),
...arr.slice(i+1)
];

const a = [1,2,3];

const b = ajouter(a,4);
const c = retirerIndex(b,1);

console.log("Arrays:",{a,b,c});


console.log("===== PARTIE 2 : MAP FILTER REDUCE =====");

const nums = [1,2,3,4,5,6];

const carres = nums.map(n => n*n);

const pairs = nums.filter(n => n%2===0);

const somme = nums.reduce((acc,n)=>acc+n,0);

console.log({carres,pairs,somme});


console.log("===== FIND SOME EVERY =====");

const premierPair = nums.find(n=>n%2===0);
const aSup5 = nums.some(n=>n>5);
const tousPositifs = nums.every(n=>n>0);

console.log({premierPair,aSup5,tousPositifs});


console.log("===== TRI IMMUTABLE =====");

const mots = ["zèbre","Arbre","avion","Banane"];

const triCI = [...mots].sort(
(a,b)=>a.localeCompare(b,"fr",{sensitivity:"base"})
);

console.log({mots,triCI});


console.log("===== PARTIE 3 : OBJETS IMMUTABLES =====");

const assoc = (obj,key,val)=>({...obj,[key]:val});

const dissoc = (obj,key)=>{
const {[key]:_,...rest} = obj
return rest
}

const user = {id:1,nom:"Lina",ville:"Paris"};

const user2 = assoc(user,"ville","Lyon");

const user3 = dissoc(user2,"ville");

console.log({user,user2,user3});


console.log("===== UTILITAIRES =====");

const isNonEmptyStr = s => typeof s==="string" && s.trim().length>0;

const isPositive = n => typeof n==="number" && n>0;

console.log(isNonEmptyStr(" ok "),isPositive(3));


console.log("===== PARTIE 4 : PIPELINE =====");

const pipe = (...fns) => x => fns.reduce((v,f)=>f(v),x);

const compose = (...fns) => x => fns.reduceRight((v,f)=>f(v),x);

const trim = s => s.trim();
const upper = s => s.toUpperCase();
const exclam = s => s + "!";

const nettoyer = pipe(trim,upper,exclam);

console.log(nettoyer("  hello  "));


console.log("===== CURRY =====");

const add = a => b => a+b;

const inc = add(1);

console.log(inc(41));


console.log("===== CURRYING =====");

const multiplierPar = facteur => x => x*facteur;

const fois3 = multiplierPar(3);

console.log(fois3(10));


const curry2 = fn => a => b => fn(a,b);

const somme2 = curry2((a,b)=>a+b);

console.log(somme2(2)(5));


console.log("===== PARTIE 6 : PRODUITS =====");

const produits = [

{id:1,nom:"Stylo",cat:"Bureau",prix:1.2,stock:50},

{id:2,nom:"Cahier",cat:"Bureau",prix:2.5,stock:0},

{id:3,nom:"Clavier",cat:"Informatique",prix:29.9,stock:10},

{id:4,nom:"Souris",cat:"Informatique",prix:19.9,stock:5}

];


const dispoTries = produits
.filter(p=>p.stock>0)
.sort((a,b)=>a.cat.localeCompare(b.cat) || a.nom.localeCompare(b.nom));

console.log("Produits disponibles:",dispoTries);


const rechercher = (items,q)=>{

const s = q.trim().toLowerCase()

if(!s) return []

return items.filter(p=>
p.nom.toLowerCase().includes(s) ||
p.cat.toLowerCase().includes(s)
)

}

console.log("Recherche:",rechercher(produits,"info"));


const valeurStock =
produits.reduce((acc,p)=>acc + p.prix*p.stock,0)

const parCategorie =
produits.reduce((acc,p)=>((acc[p.cat] ||= []).push(p),acc),{})

console.log({valeurStock,parCategorie})


console.log("===== IMPERATIF VS FP =====");

function majStockImperatif(list,id,delta){

const res=[]

for(let i=0;i<list.length;i++){

const p=list[i]

if(p.id===id)
res.push({...p,stock:p.stock+delta})
else
res.push(p)

}

return res
}

const majStockFP =
(list,id,delta)=>
list.map(p =>
p.id===id
? {...p,stock:p.stock+delta}
: p
)

console.log("Maj stock FP:",majStockFP(produits,1,5))


console.log("===== MINI PROJET USERS =====");

const users = [

{id:1,prenom:"Lina",nom:"Durand",actif:true,age:22},

{id:2,prenom:"Amar",nom:"Kaci",actif:false,age:19},

{id:3,prenom:"Zoé",nom:"Martin",actif:true,age:27},

{id:4,prenom:"Ali",nom:"Ben",actif:true,age:17}

];


const byNomPrenom =
(a,b)=>a.nom.localeCompare(b.nom) || a.prenom.localeCompare(b.prenom)

const actifsAdultes =
users
.filter(u=>u.actif && u.age>=18)
.sort(byNomPrenom)

const etiquettes =
actifsAdultes.map(u=>`${u.nom} ${u.prenom} (${u.age})`)

const ageMoyen =
actifsAdultes.reduce((acc,u,i,arr)=>acc + u.age/arr.length,0)

const tranche =
age => age<20 ? "<20" : age<25 ? "20-24" : "25+"

const groupBy =
(arr,keyFn)=>
arr.reduce((acc,x)=>((acc[keyFn(x)] ||= []).push(x),acc),{})

const groupes =
groupBy(actifsAdultes,u=>tranche(u.age))

console.log({actifsAdultes,etiquettes,ageMoyen,groupes})


console.log("===== FP DEFENSIVE =====");

const get =
(obj,path,def)=>
path.split('.').reduce((acc,k)=>acc?.[k],obj) ?? def

const cfg =
{api:{host:"localhost",port:3000}}

console.log(get(cfg,"api.port",80))
console.log(get(cfg,"db.port",5432))


const normalizeNom =
s => s.trim().replace(/\s+/g,' ').toLowerCase()

console.log(
normalizeNom("  Jean  Dupont "),
normalizeNom("  Jean  Dupont ")
)