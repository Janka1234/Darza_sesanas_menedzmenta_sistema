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

  constructor(darzenis, vaguSkaits, vaguGarums, sekluSkaits, atstarpe) {
    this.darzenis = darzenis;
    this.vaguSkaits = vaguSkaits;
    this.vaguGarums = vaguGarums;
    this.sekluSkaits = sekluSkaits;
    this.atstarpe = atstarpe;
  }

  sekluDaudzums() {
    return (this.kopGarums() / (parseInt(this.atstarpe)/100) - 2);
  }
  kopGarums() {
    return (parseInt(this.vaguGarums) * parseInt(this.vaguSkaits));
  }
  upsert() {}
}

var btn = document.getElementById("btn-launch");
var select = document.getElementById("select");
var vSkaits = document.getElementById("vaguSkaits");
var vGarums = document.getElementById("vaguGarums");
var ul = document.getElementById("ul");

btn.addEventListener("click", check);

function check() {
    console.log(select.value);
    if (select.value == "" || vGarums.value== "" || vSkaits.value == "") {
        alert("Lūdzu ievadiet / izvēlieties vērtības!");
        return;
    }
    else {
        vegetables();
    }
}

async function vegetables() {
    console.log(select);
    const { data, error } = await _supabase
        .from("Seklas")
        .select("intervals")
        .eq("darzenis", select.value)
    console.log(data);


    var veggies = new Darzeni(
        select.value,
        vSkaits.value,
        vGarums.value,
        5, //sekludaudzums,
        data[0].intervals 
    );

    console.log(veggies.sekluDaudzums());

    addList(veggies);
}
function addList(veggies) {
    var li = document.createElement("li");
    li.classList.add = ("list-group-item");
    var text = document.createElement("h4");

    text.innerText = ("Dārzenis = " + select.value +
        ", Stādīšanas intervāls = " + veggies.atstarpe +
        ", Nepieciešamās sēklas = " + veggies.sekluDaudzums());
    
    li.appendChild(text);
    ul.appendChild(li);
}