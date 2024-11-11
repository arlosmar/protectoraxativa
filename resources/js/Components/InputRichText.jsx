// https://github.com/tinymce/tinymce-react
// https://www.tiny.cloud/docs/tinymce/latest/react-cloud/
// https://www.tiny.cloud/my-account/integrate/#react
// https://www.tiny.cloud/get-tiny/language-packages/
// https://www.tiny.cloud/my-account/domains/

import { useTranslation } from "react-i18next";
import { Editor } from '@tinymce/tinymce-react';

export default function InputRichText({value,onChange,placeholder}){

    const { i18n } = useTranslation('global');    
    const lang = i18n.language;

    const handleImageUpload = (blobInfo, progress) => new Promise((resolve, reject) => {
      
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST','news/upload');

        xhr.upload.onprogress = (e) => {
            progress(e.loaded / e.total * 100);
        };

        xhr.onload = () => {

            if(xhr.status === 403){
                reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
                return;
            }

            if(xhr.status < 200 || xhr.status >= 300){
                reject('HTTP Error: ' + xhr.status);
                return;
            }

            const json = JSON.parse(xhr.responseText);

            if(!json || typeof json.location != 'string'){
                reject('Invalid JSON: ' + xhr.responseText);
                return;
            }

            resolve(json.location);
        };

        xhr.onerror = () => {
            reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
        };

        // submit form once uploaded
        //const formData = new FormData();
        //formData.append('file', blobInfo.blob(), blobInfo.filename());

        //xhr.send(formData);
    });

  	return (
  		<Editor
            apiKey='r1f37cvus34qqv02f045skvejh65iezcwlc25ro47q9x6f37'
            init={{
                language: lang,
                placeholder : placeholder,
                className: 'richtext',
                plugins: [
                    // Core editing features
                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 
                    'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',                    
                    // Your account includes a free trial of TinyMCE premium features
                    // Try the most popular premium features until Nov 17, 2024:
                    //'checklist', 'mediaembed', 'casechange', 'export', 
                    //'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 
                    //'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 
                    //'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 
                    //'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                    // Early access to document converters
                    //'importword', 'exportword', 'exportpdf'
                ],
                //images_file_types: 'jpg,svg,webp,jpeg,png,ico',
                //file_picker_types: 'image',//'file image media'
                //paste_data_images: true,
                /* without images_upload_url set, Upload tab won't show up*/
                //images_upload_url: '/news/upload',                
                //images_upload_handler: handleImageUpload,
                // show input file               
                /*
                file_picker_callback: (cb, value, meta) => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    input.addEventListener('change', (e) => {
                        const file = e.target.files[0];

                        const reader = new FileReader();
                        reader.addEventListener('load', () => {                            
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
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
                exportword_converter_options: { 'document': { 'size': 'Letter' } },
                importword_converter_options: { 'formatting': { 'styles': 'inline', 'resets': 'inline', 'defaults': 'inline', } },
            }}
            value={value}
            onEditorChange={onChange}            
        />
  	)
}
