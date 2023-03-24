const SUPABASE_URL = "https://wgrhnvucyylvwcewhsah.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncmhudnVjeXlsdndjZXdoc2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk2NDk5MzAsImV4cCI6MTk5NTIyNTkzMH0.kqH5342wskAaPooGqM2q-aTbMZnu-Fo6YHztTxmfQrk";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



class Darzeni {
    darzenis;
    vaguSkaits;
    vaguGarums;

    constructor(darzenis, vaguSkaits, vaguGarums) {
        this.darzenis = darzenis;
        this.vaguSkaits = vaguSkaits;
        this.vaguGarums = vaguGarums;
    }

    sekluDauduzms() {
        
    }
    grabValues() {
        
    }
    upsert() {
        
    }
    
}

var btn = document.getElementById("btn-launch");
var select = document.getElementById("select");
var input = document.getElementById("vaguSkaits");
var ul = document.getElementById("ul");

btn.addEventListener("click", a);
async function a() {
    const { data, error } = await _supabase
        .from("Registrs")
        .select();
}