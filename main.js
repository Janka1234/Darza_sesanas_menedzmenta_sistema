const SUPABASE_URL = "https://wgrhnvucyylvwcewhsah.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncmhudnVjeXlsdndjZXdoc2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk2NDk5MzAsImV4cCI6MTk5NTIyNTkzMH0.kqH5342wskAaPooGqM2q-aTbMZnu-Fo6YHztTxmfQrk";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



class Darzeni {
    darzenis;
    vaguSkaits;
    vaguGarums;
    sekluSkaits;
    atstarpe;
    id;
    
  constructor(darzenis, vaguSkaits, vaguGarums, sekluSkaits, atstarpe, id) {
    this.darzenis = darzenis;
    this.vaguSkaits = vaguSkaits;
    this.vaguGarums = vaguGarums;
    this.sekluSkaits = sekluSkaits;
    this.atstarpe = atstarpe;
    this.id = id;
  }

    sekluDaudzums() {
    return Math.trunc(this.kopGarums() / (parseInt(this.atstarpe)/100) - 2* this.vaguSkaits);
  }
    kopGarums() {
        console.log(parseInt(this.vaguGarums), parseInt(this.vaguSkaits));
    return (parseInt(this.vaguGarums) * parseInt(this.vaguSkaits));
  }

  //save
    async upsert(veggies) {
      const { data, error } = await _supabase
        .from("Vagas un darzeni")
          .insert({
              "Vagu_garums": parseInt(this.vaguGarums),
              "Vagu_daudzums": parseInt(this.vaguSkaits),
              "Darzenis": this.darzenis,
              "Nepieciesamas_seklas": veggies.sekluDaudzums(),
              "Seklas_darzenis": this.darzenis
          })
      onLoad();
  }
  //delete
    async del(veggies) {
      const { error } = await _supabase
        .from("Vagas un darzeni")
        .delete()
        .eq("id", veggies.id);
        onLoad();
  }
}

var btn = document.getElementById("btn-launch");
var select = document.getElementById("select");
var vSkaits = document.getElementById("vaguSkaits");
var vGarums = document.getElementById("vaguGarums");
var ul = document.getElementById("ul");
let intervaluDati = {}


btn.addEventListener("click", check);

//parbaude
function check() {
  
  if (select.value == "none" || vGarums.value == "none" || vSkaits.value == "none") {
    alert("Lūdzu ievadiet / izvēlieties vērtības!");
    return;
  }
    
  if (vGarums.value <= 0 || vSkaits.value <= 0) {
    alert("Lūdzu ievadiet skaitlisku vērtību, kas ir virs nulles!");
    return;
  } 
    else {
    vegetables();
  }
}

  document.addEventListener("keypress", function (e){
  if (e.key === "Enter") {
    check();
    }
    
  });

  //refresh
async function onLoad() {
  ul.innerHTML = "";
  vSkaits.value = "";
  vGarums.value = "";
  select.value = "none";

//ielādē dārzeņu datus
  let { data, error } = await _supabase
        .from("Vagas un darzeni")
        .select()

  let { data: seklasArr, error: intervaliError } = await _supabase
    .from("Seklas")
    .select();
  
    seklasArr.forEach(sekla => {
      intervaluDati[sekla.darzenis] = sekla
      })
  
  
    data.forEach(element => {
        const veggies = new Darzeni(
          element.Darzenis,
          element.Vagu_daudzums,
          element.Vagu_garums,
          element.Nepieciesamas_seklas,
          "",
          element.id
      );
        onLoadList(veggies);
    });
    

}
async function vegetables() {
    console.log(select);
    const { data, error } = await _supabase
        .from("Seklas")
        .select("intervals")
        .eq("darzenis", select.value)
    console.log(data);


    const veggies = new Darzeni(
        select.value,
        vSkaits.value,
        vGarums.value,
        5,
      data[0].intervals,
        //data[0].id
    );

    console.log(veggies);

    addList(veggies);
}

//pievienot list
function addList(veggies) {
  veggies.upsert(veggies);
  var li = document.createElement("li");
  var text = document.createElement("h4");
  var delbooton = document.createElement("button");
      li.classList.add = ("list-group-item mt-3");
      li.setAttribute("id", veggies.id);
      delbooton.classList.add("btn", "btn-danger");
    delbooton.innerText = "Dzēst";
  
      text.innerText = ("Dārzenis = " + veggies.darzenis +
        "\n Vagu daudzums = " + veggies.vaguGarums +
        "\n Vagu garums = " + veggies.vaguSkaits + "m" +
        "\n Stādīšanas intervāls = " + veggies.atstarpe + " cm" +
        "\n Nepieciešamās sēklas = " + veggies.sekluDaudzums() + " gab.");
    
        li.appendChild(text);
        li.appendChild(delbooton);
        ul.appendChild(li);
  
  delbooton.addEventListener("click", () => veggies.del(veggies));

  
}

//pievienot list, ja notiek caur onLoad
async function onLoadList(veggies) {
  const { data, error } = await _supabase
    .from("Vagas un darzeni")
    .select("Seklas_darzenis(*)")
  var li = document.createElement("li");
  var text = document.createElement("h4");
  var delbooton = document.createElement("button");
    li.classList.add = ("list-group-item");
    li.setAttribute("id", veggies.id);
    delbooton.classList.add("btn", "btn-danger");
    delbooton.innerText = "Dzēst";
  
      text.innerText = ("Dārzenis = " + veggies.darzenis +
        "\n Vagu daudzums = " + veggies.vaguGarums +
        "\n Vagu garums = " + veggies.vaguSkaits + "m" +
        "\n Stādīšanas intervāls = " + intervaluDati[veggies.darzenis].intervals
        + " cm" +
        "\n Nepieciešamās sēklas = " + veggies.sekluSkaits + " gab.");
    
        li.appendChild(text);
        li.appendChild(delbooton);
        ul.appendChild(li);
  
  delbooton.addEventListener("click", () => veggies.del(veggies));
    
}
    //Dārzeņu bildes, ja izvēlas select
    const productImage = document.getElementById("product-image");

    select.addEventListener("change", (event) => {
      const selectedOption = event.target.value;
      switch (selectedOption) {
        case "none":
          productImage.src = "Bildes/none.png";
          break;
        case "Kartupeli":
          productImage.src = "Bildes/kartupelis.jpg";
          break;
        case "Redisi":
          productImage.src = "Bildes/redisi.jpg";
          break;
        case "Galda_bietes":
          productImage.src = "Bildes/biete.jpg";
          break;
        case "Zirni":
          productImage.src = "Bildes/zirni.jpg";
          break;
        case "Pupas":
          productImage.src = "Bildes/pupas.jpg";
          break;
        case "Sīpoli":
          productImage.src = "Bildes/sipols.jpg";
          break;
        case "kiploki":
          productImage.src = "Bildes/kiploks.jpg";
          break;
        case "Kaposti":
          productImage.src = "Bildes/kaposts.jpg";
          break;
        case "Saulespukes":
          productImage.src = "Bildes/saulespuke.jpg";
          break;
        case "Sviesta_pupas":
          productImage.src = "Bildes/sviestapupas.jpg";
          break;
        case "Kaņepes":
          productImage.src = "Bildes/kanepes.jpg";
          break;
        case "Dilles":
          productImage.src = "Bildes/dille.jpg";
          break;
        case "Gurkis":
          productImage.src = "Bildes/gurkis.jpg";
          break;
        case "Zemenes":
          productImage.src = "Bildes/zemenes.jpg";
          break;
        case "Ķirbji":
          productImage.src = "Bildes/kirbis.jpg";
          break;
        case "Paprika":
          productImage.src = "Bildes/paprika.jpg";
          break;
        case "Kabacis":
          productImage.src = "Bildes/kabacis.jpg";
          break;
        case "Burkani":
          productImage.src = "Bildes/burkani.jpg";
          break;
      }
    });