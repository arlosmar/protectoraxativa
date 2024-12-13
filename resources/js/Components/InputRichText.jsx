// https://github.com/tinymce/tinymce-react
// https://www.tiny.cloud/docs/tinymce/latest/react-cloud/
// https://www.tiny.cloud/my-account/integrate/#react
// https://www.tiny.cloud/get-tiny/language-packages/
// https://www.tiny.cloud/my-account/domains/

// to add button to add images
// https://www.tiny.cloud/docs/tinymce/latest/file-image-upload/

// to upload the images
// https://www.tiny.cloud/docs/tinymce/latest/upload-images/

import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Editor } from '@tinymce/tinymce-react';

import { getDarkMode } from "@/Utils/Cookies";   

import { videoFormat } from "@/Utils/Format";

export default function InputRichText({origin,value,onChange,placeholder,csrf_token}){

    const { i18n } = useTranslation('global');    
    const lang = i18n.language;

    const darkmode = getDarkMode();

    // to fix the issue with tinymce and modals
    useEffect(() => {
        document.addEventListener('focusin', function (e) { 
            if (e.target.closest('.tox-tinymce-aux, .moxman-window, .tam-assetmanager-root') !== null) { 
                e.stopImmediatePropagation();
            } 
        });
    });

    // called every time an image is added to the tinymce
    const handleImageUpload = (blobInfo, progress) => new Promise((resolve, reject) => {
      
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        var path = '';
        switch(origin){

            case 'user-news':
                path = 'news/upload';
                break;

            case 'user-animals':
                path = 'animal/upload';
                break;

            case 'user-people':
                path = 'person/upload';
                break;

            default:
                return;
        }

        xhr.open('POST',path);
        xhr.setRequestHeader("X-CSRF-Token", csrf_token);

        xhr.upload.onprogress = (e) => {
            progress(e.loaded / e.total * 100);
        };

        xhr.onload = () => {

            if(xhr.status === 403){
                //reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
                reject({ message: 'Error', remove: true });
                return;
            }

            if(xhr.status < 200 || xhr.status >= 300){
                reject('HTTP Error: ' + xhr.status);
                // reject('Error');
                return;
            }

            const json = JSON.parse(xhr.responseText);

            //if(!json || typeof json.location != 'string'){
            if(!json){
                //reject('Invalid JSON: ' + xhr.responseText);
                reject('Error');
                return;
            }
            else{

                if(json.result && json?.location){
                    resolve(json.location);
                }
                else{
                    //reject('Invalid JSON: ' + xhr.responseText);
                    reject('Error');
                    return;
                }
            }            
        };

        xhr.onerror = () => {
            reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
        };

        // upload image        
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
        // append CSRF token in the form data
        //formData.append('_token',csrf_token);        
        xhr.send(formData);
    });

    const pluginsEditor = [
        // Core editing features
        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 
        'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount', 'code'                  
        // Your account includes a free trial of TinyMCE premium features
        // Try the most popular premium features until Nov 17, 2024:
        //'checklist', 'mediaembed', 'casechange', 'export', 
        //'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 
        //'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 
        //'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 
        //'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
        // Early access to document converters
        //'importword', 'exportword', 'exportpdf'
    ];

    // animals and people don't add images on the description
    if(origin === 'user-news'){
        pluginsEditor.push('image');
    }

  	return (
  		<Editor
            apiKey='r1f37cvus34qqv02f045skvejh65iezcwlc25ro47q9x6f37'
            init={{
                skin: darkmode ? "oxide-dark" : null,
                content_css: darkmode ? "dark" : null,
                language: lang,
                placeholder : placeholder,
                className: 'richtext',
                plugins: pluginsEditor,
                media_alt_source: false,
                audio_template_callback: (data) => {
                    '<audio controls>\n' +
                    `<source src="${data.source}"${data.sourcemime ? ` type="${data.sourcemime}"` : ''} />\n` +
                    (data.altsource ? `<source src="${data.altsource}"${data.altsourcemime ? ` type="${data.altsourcemime}"` : ''} />\n` : '') +
                    '</audio>'
                },
   
                iframe_template_callback: (data) => {
                    `<iframe title="${data.title}" width="${data.width}" height="${data.height}" src="${data.source}"></iframe>`
                },
                media_url_resolver: (data) => {
                    return new Promise((resolve) => {
                        //if (data.url.indexOf('youtube') !== -1) {
                            //const embedHtml = `<iframe src="${data.url}" width="400" height="400" ></iframe>`;
                            const embedHtml = `
                                <iframe
                                    class='video'                       
                                    src="${videoFormat(data.url)}"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen                        
                                /></iframe>`;
                            resolve({ html: embedHtml });
                        //} 
                        //else {
                        //    resolve({ html: '' });
                        //}
                    });
                },

                //images_file_types: 'jpg,svg,webp,jpeg,png,ico',                                
                /* without images_upload_url set, Upload tab won't show up*/                               

                /* enable title field in the Image dialog*/
                image_title: true,
                
                /* enable automatic uploads of images represented by blob or data URIs*/
                automatic_uploads: true,
                
                // URL of our upload handler                 
                // fails because of the csrf token
                //images_upload_url: '/news/upload',

                // called every time an image is added to the tinymce
                images_upload_handler: handleImageUpload,
                    
                // here we add custom filepicker only to Image dialog
                file_picker_types: 'image',
                block_unsupported_drop: true,
                
                paste_data_images: false,
                // to have the button to choose image instead of only pasting
                /*
                this is to have a button to upload on the "General" tab.
                removing because if the upload fails it pastes the image on the textare
                file_picker_callback: (cb, value, meta) => {
                    
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    input.addEventListener('change', (e) => {
                    
                        const file = e.target.files[0];
                        
                        const reader = new FileReader();
                        reader.addEventListener('load', () => {
                            // Note: Now we need to register the blob in TinyMCEs image blob
                            // registry. In the next release this part hopefully won't be
                            // necessary, as we are looking to handle it internally.                            
                            const id = 'blobid' + (new Date()).getTime();
                            const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                            const base64 = reader.result.split(',')[1];
                            const blobInfo = blobCache.create(id, file, base64);
                            blobCache.add(blobInfo);

                            // call the callback and populate the Title field with the file name
                            cb(blobInfo.blobUri(), { title: file.name });
                        });
                        reader.readAsDataURL(file);
                    });

                    input.click();
                },
                */
                toolbar: 'link image media | fontsize | bold italic underline strikethrough | table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | blocks fontfamily | undo redo removeformat',
                tinycomments_mode: 'embedded',
                //tinycomments_author: 'Author name',
                /*
                mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                ],*/
                //ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                //exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
                //exportword_converter_options: { 'document': { 'size': 'Letter' } },
                //importword_converter_options: { 'formatting': { 'styles': 'inline', 'resets': 'inline', 'defaults': 'inline', } },
            }}
            value={value}
            onEditorChange={onChange}            
        />
  	)
}
