function readRomFiles(event) {
    var romFiles = event.target.files;
    var romFile = romFiles[0];
    console.log(romFile.name + " is " + romFile.size + " bytes");

    var blobLine1 = romFile.slice(1141, 1178);
    var blobLine2 = romFile.slice(1178, 1195);
    var blobBorderColor = romFile.slice(3289, 3290);
    var blobBackgroundColor = romFile.slice(3290, 3291);
    var blobTextColor = romFile.slice(1333, 1334);

    var parsedLine1 = "";
    var parsedLine2 = "";
    var parsedBorderColor = "";
    var parsedBackgroundColor = "";
    var parsedTextColor = "";

    var reader = new FileReader();

    reader.onload = function(loadedEvent) {
    	parsedLine1 = loadedEvent.target.result;
        console.log("Line 1: [" + parsedLine1 + "]");

        var reader2 = new FileReader();
        reader2.onload = function(loadedEvent) {
            parsedLine2 = loadedEvent.target.result;
            console.log("Line 2: [" + parsedLine2 + "]");

            var reader3 = new FileReader();
            reader3.onload = function(loadedEvent) {
                parsedBorderColor = loadedEvent.target.result.charCodeAt();
                console.log("Border color from ROM: " + parsedBorderColor);

                var reader4 = new FileReader();
                reader4.onload = function(loadedEvent) {
                    parsedBackgroundColor = loadedEvent.target.result.charCodeAt();
                    console.log("Background color from ROM: " + parsedBackgroundColor);

                    var reader5 = new FileReader();
                    reader5.onload = function(loadedEvent) {
                        parsedTextColor = loadedEvent.target.result.charCodeAt();
                        console.log("Text color from ROM: " + parsedTextColor);
                        drawScreen();
                    }
                    reader5.readAsText(blobTextColor);

                }
                reader4.readAsText(blobBackgroundColor);

            }
            reader3.readAsText(blobBorderColor);

        };
        
        reader2.readAsText(blobLine2);
    };

    var drawScreen = function(line1, line2) {
        var textarea = document.getElementById("c64-screen-text");

        textarea.value = "\r" + parsedLine1 + parsedLine2 + "38911 BASIC BYTES FREE \r\rREADY.\r█";
        textarea.style.borderColor = "#" + colors[parsedBorderColor];
        textarea.style.backgroundColor = "#" + colors[parsedBackgroundColor];
        textarea.style.color = "#" + colors[parsedTextColor];
    }


    reader.readAsText(blobLine1);

    var colors = ["000000", "FFFFFF", "880000", "AAFFEE", "CC44CC", "00CC55", "0000AA", "EEEE77",
                  "DD8855", "664400", "FF7777", "333333", "777777", "AAFF66", "0088FF", "BBBBBB"];
}
