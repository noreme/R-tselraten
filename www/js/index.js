 

let rep, endAngleE, endAngle;
let punkte = 0;
var fehler = 0;
var versucht=0;
var erfolgquote ="";
var erfolgquoteVariable=0;
var ctx, radius;
var erste, zweite, dritte;
var fehlerr, punktee;
window.onload = tout();


var db = null;
var newData = true;



/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  //document.getElementById("deviceready").classList.add("ready");
}

// connexion et creation de la Bd
document.addEventListener('deviceready', 
 function() 
 {
       db = window.sqlitePlugin.openDatabase({
       name: 'game.db',
       location: 'default'});

       db.transaction(
           function(tx) {
               tx.executeSql('CREATE TABLE IF NOT EXISTS score (versucht INTEGER, erfolg INTEGER, fehler INTEGER)');
           }, function(error) {
                   console.log('Transaction ERROR: ' + error.message);
           }, function() {
                   console.log('Created database finisch');
                  //  insertData();
                   getData();
           }
       );	
   }
);




// function canvas
function tout() {
  function init() {
    var canvas = document.getElementById("c1");
    ctx = canvas.getContext("2d");
    var x = 163;
    var y = 130;
    radius = 100;
    var startAngle = Math.PI;
    var intermediaire = Math.random() + 1;
    endAngle = intermediaire * Math.PI;
    var counterClockwise = false;
    ctx.height = 10;
    ctx.beginPath();


    ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    ctx.lineWidth = 40;

    ctx.strokeStyle = "aqua";
    ctx.stroke();
  }
  init();


  var tab = Array();
  for (var i = 0; i < 3; i++) {
    tab[i] = Math.floor(Math.random() * 180) + 1;
  }
  endAngleE = Math.floor((endAngle * 180) / (2 * Math.PI));
  tab[3] = endAngleE;
  console.log(tab);
  tab = randomize(tab);

  function randomize(tab) {
    var d, a, tmp;
    for (d = tab.length - 1; d > 0; d--) {
      a = Math.floor(Math.random() * (d + 1));
      tmp = tab[d];
      tab[d] = tab[a];
      tab[a] = tmp;
    }
    return tab;
  }
  console.log(tab);
  document.querySelector("#a").value = tab[0];
  document.querySelector("#b").value = tab[1];
  document.querySelector("#c").value = tab[2];
  document.querySelector("#d").value = tab[3];
}




// hier der Wahl nehmen
const boxes = document.querySelectorAll(".box");
const nombre = boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    console.log(e.target.value);
    console.log(endAngleE);
    rep = e.target.value;
    versucht += 1;
    compare();
    tout();

  });
});



// vergleich des ergebnis

function compare() {
  if (rep == endAngleE) {
    punkte++;
    punktee = 1;
    fehlerr = 0;
    erfolgquoteVariable = (punkte * 100) / versucht;
    erfolgquote = erfolgquoteVariable.toFixed(0);
    document.querySelector(
      "div > nav > p1"
    ).innerHTML = `<i style="color: white"> ${punkte}</i>`;
    document.querySelector(
      "div > nav > p3"
    ).innerHTML = `<i style="color: white"> ${erfolgquote}%</i>`;

    document.querySelector(
      "div > span"
    ).innerHTML = `<div id="message" style="
    position: fixed;
    z-index: 1; /* Sit on top */
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4);"><i id="message"; style="background-color:white; border-color: #849460; 
    border-radius: 10px; width:30%; height:15%; text-align:center; position:absolute; margin:0; transform:translate(-50%, -50%);left: 50%; top: 40%; padding: 4px; font-size:12px; line-height: 1;">
    bingo ${endAngleE} <p id="messag">ist die Antwort</p>.
 </i></div>`;
    setTimeout(function () {
      var courtePriode = document.querySelector("#message");
      courtePriode.style.display = "none";
    }, 3000);
  } else {
    fehler++;
    punktee = 0;
    fehlerr = 1;
    document.querySelector(
      "div > nav > p2"
    ).innerHTML = `<i style="color: white">${fehler}</i>`;
    document.querySelector(
      "div > span"
    ).innerHTML = `<div id="message" style="
    position: fixed;
    z-index: 1; /* Sit on top */
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4);">
    <i id="message"; style="background-color:white; border-color: #849460; 
       border-radius: 10px; width:30%; height:15%; text-align:center; position:absolute; transform:translate(-50%, -50%);left: 50%; top: 40%; padding: 4px; font-size: 12px; line-height: 1;">
       sorry ${endAngleE} <p id="messag">ist die Antwort</p>.
    </i></div>`;

    setTimeout(function () {
      var courtePriode = document.querySelector("#message");
      courtePriode.style.display = "none";
    }, 3000);
  }
  newData = true;
  insertData(); // im DB infügen
  // hier streiche ich die Partei, die zusätzlich zum Schema ist
  ctx.beginPath();
  ctx.clearRect(10, 10, 1000, 1000);
  ctx.closePath();
}
 
// sprache der APP ----------------------------

const de = document.querySelector("#de");
de.addEventListener("click", () => {
  document.querySelector("#text").innerHTML = "SCHÄTZE DEN WINKELN";
   
  document.querySelector("#fehler").innerHTML = "fehler";
  document.querySelector("#punkte").innerHTML = "punkte";
  document.querySelector("#erfolgquote").innerHTML = "erfolgquote";
  document.querySelector("#col1").innerHTML = "HAUPSEITE";
  document.querySelector("#col2").innerHTML = "STATISTIK";

  document.querySelector("#versucht").innerHTML = "VERSUCHT";
  document.querySelector("#erfolg").innerHTML = "ERFOLG";
  document.querySelector("#fehler2").innerHTML = "FEHLER";
  document.querySelector("#messag").innerHTML = "ist die Antwort";
}); 

const en = document.querySelector("#en");
en.addEventListener("click", () => {
  document.querySelector("#text").innerHTML = "CHOOSE THE RIGHT ANGLE";
  document.querySelector("#col1").innerHTML = "HOME";
  document.querySelector("#col2").innerHTML = "STATISTICS";
  document.querySelector("#fehler").innerHTML = "error";
  document.querySelector("#punkte").innerHTML = "points";
  document.querySelector("#erfolgquote").innerHTML = "sucess rate";

  document.querySelector("#versucht").innerHTML = "TRIES";
  document.querySelector("#erfolg").innerHTML = "SUCCESS";
  document.querySelector("#fehler2").innerHTML = "ERROR";
  document.querySelector("#messag").innerHTML = "is the Answer";
});

// insertion des donnee dans la BD
function insertData()
{
	 
	if ( newData == true )
	{
        console.log("INSERTION von DONNÉES");
		db.transaction(
            function(tx) {
                console.log("-------- TRANSACTION ET ET REQUETE SQL ----------");
                tx.executeSql('INSERT INTO score VALUES (?1, ?2, ?3)', [versucht, punktee, fehlerr]);
            }, function(error) {
                    alert('Transaction ERROR: ' + error.message);
            }, function() {
                    // alert('Daten erfolgreich eingefug');
                    newData = false;
                    getData();
            });
            
	}
	
	
	else
	{
		db.transaction(function(tx) {
			var query = "UPDATE score SET zweite = ?1, dritte = ?2 WHERE erste= ?3";
			tx.executeSql( query, [versucht, punktee, fehlerr], 
			function(tx, res) {
				alert("Daten update!!!");
				getData();
			},
			function(tx, error) {
				console.log('UPDATE error: ' + error.message);
			});
		});
	}
}
// INformation in BD Abholen


function getData()
{
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM score', [], function(tx, rs) {			
			
			
			var tbDataCustomer = "<div style=\" font-size:12px; font-weight: bold; padding-top:10px;\"><center><table width=\"70%\" border=\"1px\" style=\"text-align:center;border: 1px solid grey;background-color: aqua;\"><tr  style=\"box-shadow: 3px 2px 22px 1px #64c2adda;\"><td width=\"25%\" id=\"versucht\"><center>versucht</center></td><td width=\"25%\"id=\"erfolg\"><center>erfolg</center></td><td width=\"25%\" id=\"fehler2\"><center>fehler</center></td></tr>";
			if ( rs.rows.length != 0 )
			{
				for ( i = 0; i < rs.rows.length; i++ )
         
				{
            console.log(rs.rows.item(i));
						tbDataCustomer += "<tr><td> n°" +  rs.rows.item(i).versucht + "</td><td>" +  rs.rows.item(i).erfolg + "</td><td>" +  rs.rows.item(i).fehler + "</td></tr>";
				}
			}
      else
			{
				tbDataCustomer += "<tr><td colspan=3> <center> . . . </center></td></tr>";  
			}
			tbDataCustomer += "</center></table></div>";
      document.querySelector("#poi").innerHTML = tbDataCustomer;     	 
	}, function(tx, error) {
			console.log('SELECT error: ' + error.message);
		});
	});
}
 
 //----------- Weg auf dem ergebnis----------------
 const col = document.querySelectorAll('.sprach');
    const coll= col.forEach((col)=>{
      col.addEventListener('click', (e)=>{
	      // console.log(e.target.innerHTML);
	        const acc= e.target.innerHTML;
      if (acc=='HAUPSEITE' || acc=='HOME'){
	                var courtePriode = document.querySelector("#app");
	             courtePriode.style.display = ""; 
               document.querySelector("#ici").style.display="none";
               document.querySelector("#lösche").style.display="none";
               document.querySelector("#poi").style.display="none";
 }
     else {
      document.querySelector("#löschen").style.display="";
	                var courtePriode = document.querySelector("#app");
	                courtePriode.style.display = "none";
                 document.querySelector("#ici").style.display="";
                  document.querySelector("#lösche").style.display="";
                  document.querySelector("#poi").style.display="";
 }
   });
 });
 
  //info in db holen
  document.querySelector("#löschen").addEventListener("click", () => {
     removeData();
 });

   function removeData() {
     db.transaction(function (tx) {
      tx.executeSql("DELETE FROM score ", [], function (tx, res) {
          // alert("gelöscht!!!");
           getData();
        },
         function (tx, error) {
           console.log('REMOVE DATA error: ' + error.message);
        });
           });
      }
