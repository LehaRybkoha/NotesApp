const notes = () => {
    const inputElem = document.querySelector('.note-input-elem');
    const inputBtn = document.querySelector('.note-send-btn');

    inputElem.onfocus = () => {
        makeInputWider(inputElem, inputBtn);
    };
    inputElem.onblur = () => {
        makeInputNarrowly(inputElem, inputBtn);
    };
    inputElem.oninput = () => {
        makeInputWiderWhileTyping(inputElem);
    };
    inputBtn.onclick = () => {
        toggleNoteItem();
    };


    //Func that makes input wider, while focused
    function makeInputWider(input, button) {
        input.style.minHeight = '50px';
        input.style.backgroundColor = 'rgba(245,185,16, 0.6)';
        button.style.opacity = '1';
        button.style.backgroundColor = 'rgb(249, 213, 111)';
    }
    //Func that makes input wider, while typing
    function makeInputWiderWhileTyping(input) {
        const heightLimit = 400;
        input.style.height = '';
        input.style.height = Math.min(input.scrollHeight, heightLimit) + 'px';
    }
    //Func that makes input narrowly, while blured
    function makeInputNarrowly(input, button) {
        //If we have at list 1 symbol inside input - ok, else resize it to default
        if (input.value.match(/\S/)) {
            //console.log('Works')
        } else {
            input.style.minHeight = '';
            input.style.height = '';
            input.style.backgroundColor = '#fff';
            button.style.opacity = '0';
            button.style.backgroundColor = '#fff';
        }
    }
    //Func that makes and deletes note item
    function toggleNoteItem() {
        const noteItem = document.createElement('div');
        const noteList = document.querySelector('.note__list');
        let textareaHeightCount;
        let noteContent;

        function createButton() {

            noteContent = inputElem.value;
            noteItem.classList.add('note__item');
            noteItem.insertAdjacentHTML('afterbegin', `
            <button class="close-item"><i class="fas fa-times close-item-icon"></i></button>
            <p class="note__item-textarea">${noteContent}</p>
        `);
            noteList.appendChild(noteItem);
            const textareaNote = noteItem.querySelector('.note__item-textarea');

            //Get height property
            textareaHeightCount = window.getComputedStyle(textareaNote, null).getPropertyValue('height');
            //Replace px to "" in order to put just Number
            let textareaHeightCountSerialize = textareaHeightCount.replace(/px/g, '');
            //Removing Bug, that reduces height in 24px
            textareaHeightCountSerialize = Number(textareaHeightCountSerialize) + 24;
            //After fixing bug again make it as a string and add "px"
            textareaHeightCount = String(textareaHeightCountSerialize) + 'px';
            //Make height of a parent element as a child element
            noteItem.style.height = textareaHeightCount;
        }
        createButton();

        //Func that deletes note item
        const deleteButton = noteItem.querySelector('.close-item');
        function deleteNoteItem() {
            deleteButton.parentElement.remove();
        }
        deleteButton.onclick = () => {
            deleteNoteItem();
        };
    }


};
notes();


//Below - the previous version of this code. Upper - optimized version

// const notes = () => {
//     const inputElem = document.querySelector('.note-input-elem');
//     const inputBtn = document.querySelector('.note-send-btn');
//
//     //Func that makes input wider, while focused
//     function makeInputWider(input, button) {
//         const heightLimit = 400;
//
//         input.onfocus = () => {
//             input.style.minHeight = '100px';
//             input.style.backgroundColor = 'rgba(245,185,16, 0.6)';
//             button.style.opacity = '1';
//             button.style.backgroundColor = 'rgb(249, 213, 111)';
//         };
//         input.onblur = () => {
//             //If we have at list 1 symbol inside input - ok, else resize it to default
//             if (input.value.match(/\S/)) {
//                 console.log('Works')
//             } else {
//                 input.style.minHeight = '';
//                 input.style.height = '';
//                 input.style.backgroundColor = '#fff';
//                 button.style.opacity = '0';
//                 button.style.backgroundColor = '#fff';
//             }
//         };
//         input.oninput = () => {
//             input.style.height = '';
//             input.style.height = Math.min(input.scrollHeight, heightLimit) + 'px';
//         };
//     }
//     makeInputWider(inputElem, inputBtn);
// };
// notes();