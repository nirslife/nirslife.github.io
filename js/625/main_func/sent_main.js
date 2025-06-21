// begin of  ./js/global_var.js - Global variable to hold the configuration and state
var gv = {
  cst: {
    FBSets: null,
    config_phrase: null
  },
  sts: {
    vdata1: null
  }
};
// end of ./js/global_var.js



// Function to handle control Phrase text click END


function MainFunc() {  
  init().then(() => {
    console.log("Initialization complete.");
  }).catch(error => {
    console.error("Error during initialization:", error);
  });
}

async function init() {  
  //gv.cst.FBSets = Init_LoginFireBaseSets('text_phrase_obj.json');
  gv.cst.FBSets = Init_LoginFireBaseSets('text_phrase_obj');
  await this.LoginFireBase(gv.cst);
}

function Init_LoginFireBaseSets(dataset1){
  let apiKey1 = "AIzaSyD30jGLtBWI9IhZdsOolPLPYo6MCqYj7Lw";
  if (!dataset1) {
    dataset1 = "text_phrase_obj";
  }
  if (!dataset1.endsWith('.json')) {
    dataset1_json = dataset1 + '.json';
  }else {
    dataset1_json = dataset1;
  }
  if (dataset1.startsWith('/')) {
    dataset1 = dataset1.substring(1);
  }
  if (dataset1.endsWith('/')) {
    dataset1 = dataset1.slice(0, -1);
  }

  let oj = {
    email:"saboo1@urm.se",
    password:"B0u_1hg81apAqw",
    UrlTrans1: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey1}`,
    UrlPost1: `https://engapp-2025-default-rtdb.europe-west1.firebasedatabase.app/${dataset1_json}?auth=`,
    DataSet_Basic: `${dataset1}`,
    idToken: ""
  };      
  return oj;
}

async function LoginFireBase(cst1) {
    FBSets = cst1.FBSets;
    //FBSets = cst1;
    const email = FBSets.email;
    const password = FBSets.password;
    const aUrlTrans1 = FBSets.UrlTrans1;
    const body1 = JSON.stringify({ email, password, returnSecureToken: true });
    const post_obj = {
        method: 'post',
        body: body1,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(aUrlTrans1, post_obj);
    const vdata = await response.json();
    FBSets.idToken = vdata.idToken;
    await this.CallBackLoginFireBase();
}

// after 
// https://engapp-2025-default-rtdb.europe-west1.firebasedatabase.app/text_phrase_obj/article_text/0.json/?auth=
// i got 
// 'Bad Request'


function GetUrlPathWithAddUrl(addUrl) {
    let cst1 = window.gv && window.gv.cst ? window.gv.cst : (this.gv ? this.gv.cst : null);
    if (!addUrl) {
        addUrl = "";
    }
    if (addUrl && !addUrl.endsWith('.json')) {
        addUrl += '.json';
    }
    if (addUrl && !addUrl.endsWith('/')) {
        addUrl += '/';
    }
    if (addUrl.startsWith('/')) {
        addUrl = addUrl.substring(1);
    }
    let ret_pathurl = `https://engapp-2025-default-rtdb.europe-west1.firebasedatabase.app/${cst1.FBSets.DataSet_Basic}/${addUrl}?auth=`;

    return ret_pathurl + cst1.FBSets.idToken;
}

async function CallBackLoginFireBase() {
  let arr1 = null;
  await RequestArrFireBase(arr1, 'GET');
}

async function RequestArrFireBase(vobj, ametod) {
    let cst1 = window.gv && window.gv.cst ? window.gv.cst : (this.gv ? this.gv.cst : null);
    let jsn1 = "";
    let post_obj = null;
    if (vobj != null) {
        jsn1 = JSON.stringify(vobj);
        post_obj = {
            method: ametod,
            body: jsn1,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    let aurl = cst1.FBSets.UrlPost1 + cst1.FBSets.idToken;
    const response = await fetch(aurl, post_obj);
    let vdata = await response.json();
    if (ametod == 'GET') {
        if (typeof CB_AfterGet === 'function') {
            await CB_AfterGet(vdata);
        }
    }
    if (ametod == 'PATCH') {
        if (typeof CB_AfterPatch === 'function') {
            await CB_AfterPatch(vdata);
        }
    }
}

function GetObjForRequest() {
    let ObjRequest = {    
        vobj: null,
        ametod: null,
        addUrl: null,
        CallBackFunction: null
    };
    return ObjRequest;
}

//async function RequestArrFireBase_AddUrl(vobj, ametod, addUrl) {
async function RequestArrFireBase_AddUrl(ObjRequest) {
    let { vobj, ametod, addUrl } = ObjRequest;

    let jsn1 = "";
    let post_obj = null;
    if (vobj != null) {
        jsn1 = JSON.stringify(vobj);
        post_obj = {
            method: ametod,
            body: jsn1,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    let aurl = GetUrlPathWithAddUrl(addUrl);
    const response = await fetch(aurl, post_obj);
    let vdata = await response.json();
    let CallBackFunction = ObjRequest.CallBackFunction;
    if (CallBackFunction && typeof CallBackFunction === 'function') {
        await CallBackFunction(vdata, ametod);
    }
    // if (ametod == 'GET') {
    //     if (typeof CB_AfterGet_URL === 'function') {
    //         await CB_AfterGet_URL(vdata, ametod);
    //     }
    // }
    // if (ametod == 'PATCH') {
    //     if (typeof CB_AfterPatch_URL === 'function') {
    //         await CB_AfterPatch_URL(vdata, ametod);
    //     }
    // }
}

async function CB_AfterPatch_URL(vdata, ametod) {
 //   AfterRequest_FireBase();
 if (vdata) {
   console.log("updated");
   console.log(vdata);
 }
}

async function CB_AfterGet_URL(vdata, ametod) {
 //   AfterRequest_FireBase();
}


async function CB_AfterGet(vdata) {
   Update_StateData(vdata);
   AfterRequest_FireBase();
}

async function CB_AfterPatch(vdata) {
   Update_StateData(vdata);    
   AfterRequest_FireBase();
}


function AfterRequest_FireBase() {
    let TypeProgram = gv.sts.config_phrase.CurProgramType;
    switch (TypeProgram) {
        case "ArticleText":
            Main_ArticleText_LoadDataToHTML();
            break;
        case "Phrase":
            Main_Phrase_LoadDataToHTML();
            break;
        case "Phr_New":
            Main_Phr_New_LoadDataToHTML();
            break;
        case "VoiceArticleText":
            Main_VoiceArticleText_LoadDataToHTML();
            break;
        case "ExpImpForTrans_Sent":
            Main_ExpImpForTrans_Sent_LoadDataToHTML();
            break;
        case "ExpImpForTrans_Phrase":
            Main_ExpImpForTrans_Phrase_LoadDataToHTML();
            break;
        case "SortPhrase":
            Main_SortPhrase_LoadDataToHTML();
            break;
        case "CollectNewWords":
            Load_Collect_New_Words_HtmlContent();
            break;
        default:
            SetDBCurProgramType("Phrase");
            break;
    }    
}






function SetDBCurProgramType(programType) {  
  gv.sts.config_phrase.CurProgramType = programType;
  SetDBConfigPhrase(gv.sts.config_phrase);
}

function SetDBCurArticleText(cur_idarticle_text) {  
  gv.sts.config_phrase.cur_idarticle_text = cur_idarticle_text;
  SetDBConfigPhrase(gv.sts.config_phrase);
}

function SetDBConfigPhrase(configPhrase) {
  gv.sts.config_phrase = configPhrase;
  let vdata = gv.vdata1;
  if (!vdata) return;
  vdata["config_phrase"] = configPhrase;
  RequestArrFireBase(vdata, 'PATCH');
}

function Update_StateData(vdata) {
    if (!vdata) return;
    let sts1 = gv.sts;
    sts1.sentences = vdata["sentences"];
    sts1.phrases = vdata["phrases"];
    sts1.article_text = vdata["article_text"];
    sts1.config_phrase = vdata["config_phrase"];
    sts1.collect_new_words = vdata["collect_new_words"];
    sts1.sentences_for_processing = null;        
    gv.vdata1 = vdata;
}

function Click_Main_SaveAllBase() {
    return;
    let vdata = gv.data1;
    if (!vdata) return;
    let datetime1 = new Date().toISOString();
    datetime1 = datetime1.replace(/[-:T]/g, '').slice(0, 15); // Format datetime to YYYYMMDDHHMMSS
    Init_LoginFireBaseSets('text_phrase_obj'+datetime1);
}