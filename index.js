document.addEventListener('DOMContentLoaded', function(){
    var ageInput = document.querySelector('input[type=text]');
    var ageGrandEl = ageInput.parentNode.parentNode;
    var selectButton = document.querySelector('select[name=rel]');
    var selectGrandEl = selectButton.parentNode.parentNode;
    var addButton = document.querySelector('button');
    var submitButton = document.querySelector('button[type=submit]');
    var famList = [];
    var bodyEl = document.querySelector('body');
    var ageSpan = document.createElement("span");
    var relSpan = document.createElement("span");
    var uList = document.createElement("ul");
    var smokerEl = document.querySelector('input[type=checkbox]');
    var preEl = document.querySelector('pre');

    var debounced = true;
    var debounceInterval = 300;
    var debounceSetToTrue = function(){
        debounced = true;
    }


    function add_person(e){
        e.preventDefault();
        if (debounced){
            var delButton = document.createElement("button")
            var nodeLi = document.createElement("li");
            var delButText = document.createTextNode("X");
            var nodeText = document.createTextNode(ageInput.value +
                                                   "," + selectButton.value +
                                                   "," + smokerEl.checked + ", ");
            nodeLi.appendChild(nodeText);
            delButton.appendChild(delButText);
            nodeLi.appendChild(delButton);
            uList.appendChild(nodeLi);
            var parent = nodeLi.parentNode;

            delButton.addEventListener("click",function(){
                uList.removeChild(nodeLi);
            },false);

            debounced = false;
            setTimeout(debounceSetToTrue, debounceInterval);
        }
    }

    function sending_data(d){
        var url = "http://localhost:8000/handlePost/";
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        var params = "data="+d;

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 2) {
                console.log('send() has been called, and headers and status are available');
            }
            if (xhr.readyState === 4 && xhr.status == 200){
                console.log(this.responseText);
            }
        }

        xhr.open("Post", url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);

    }

    function submit_form(d){
        preEl.innerHTML = "";
        preEl.innerHTML = d;
        preEl.style.display = "inline-block";
        preEl.style.wordWrap = "break-word";
        preEl.style.whiteSpace = "normal";
        famList = [];
        //Uncomment, edit function, and add server side code.
        //sending_data(d);
    }

    function validate_info(e){
        if(ageInput.value === ''){
            e.preventDefault();
            ageSpan.innerHTML = "** Please fill in the age.";
        }

        if(parseInt(ageInput.value) <= 0){
            e.preventDefault();
            ageSpan.innerHTML = "** Please fill in a positive number greater than 0.";
        }

        if(ageInput.value != ''  && parseInt(ageInput.value) > 0){
            e.preventDefault();
            ageSpan.innerHTML = "";
        }

        if (selectButton.value.length === 0){
            e.preventDefault();
            relSpan.innerHTML =  "** Please select a relationship.";
        }

        if (selectButton.value.length > 0){
            e.preventDefault();
            relSpan.innerHTML =  "";
        }

        if(ageInput.value != ''  && parseInt(ageInput.value) > 0 && selectButton.value.length > 0){
            // Submitting form.
            var liEls = document.querySelectorAll('li');
            for (var i = 0; i < liEls.length; i++) {
                console.log(liEls[i].textContent);
                var str = liEls[i].textContent;
                var splitStrArr = str.split(",");

                famList.push({ age: splitStrArr[0], relationship: splitStrArr[1], smoker: splitStrArr[2] });
            }
            var data = JSON.stringify(famList);
            submit_form(data);
        }

    }

    function setup(){
        ageGrandEl.appendChild(ageSpan);
        selectGrandEl.appendChild(relSpan);
        bodyEl.appendChild(uList);

        addButton.addEventListener("click",add_person,false);
        submitButton.addEventListener("click",validate_info,false);
    }

    setup();
});
