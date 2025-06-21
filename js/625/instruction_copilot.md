2025-06-21

1) can you build relationship between all function in 625 dir

2) 
collect_new_words: array in FireBase, 
[
{
   idarticle_text: <value> 
   items:[
     { 
        word: <value>,
        idsentence: <value>,
        timestamp: <value>
     },
     { 
        word: <value>,
        idsentence: <value>,
        timestamp: <value>
     }
     ..........
   ]
},

{
   idarticle_text: <value> 
   items:[
     { 
        word: <value>,
        idsentence: <value>,
        timestamp: <value>
     },
     { 
        word: <value>,
        idsentence: <value>,
        timestamp: <value>
     }
     ..........
   ]
}
.............................

]

1.1 i need to patch exist item or append new one if not exists. give me example function for this by the use RequestArrFireBase_AddUrl(ObjRequest);


its possible without getting from firebase entire gv.sts.collected_words object?
    