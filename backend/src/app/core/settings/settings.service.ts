import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';

@Injectable()
export class SettingsService {

    private user: any;
    private app: any;
    private layout: any;
    private editor: any;

    constructor(private http: HttpClient) {

        // User Settings
        // -----------------------------------
        this.user = {
            name: 'John',
            job: 'ng-developer',
            picture: 'assets/img/user/02.jpg'
        };

        // App Settings
        // -----------------------------------
        this.app = {
            name: 'Angle',
            description: 'Angular Bootstrap Admin Template',
            year: ((new Date()).getFullYear())
        };

        // Layout Settings
        // -----------------------------------
        this.layout = {
            isFixed: true,
            isCollapsed: false,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: false,
            asideHover: false,
            theme: null,
            asideScrollbar: false,
            isCollapsedText: false,
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };

        this.editor = {
            language: 'zh_CN',
            images_upload_handler: (blobInfo, succFun, failFun) => {
                // var xhr, formData;
                // var file = blobInfo.blob();//转化为易于理解的file对象
                // xhr = new XMLHttpRequest();
                // xhr.withCredentials = false;
                // xhr.open('POST', '/demo/upimg.php');
                // xhr.onload = function () {
                //     var json;
                //     if (xhr.status != 200) {
                //         failFun('HTTP Error: ' + xhr.status);
                //         return;
                //     }
                //     json = JSON.parse(xhr.responseText);
                //     if (!json || typeof json.location != 'string') {
                //         failFun('Invalid JSON: ' + xhr.responseText);
                //         return;
                //     }
                //     succFun(json.location);
                // };
                // formData = new FormData();
                // formData.append('file', file, file.name);//此处与源文档不一样
                // xhr.send(formData);


                //////////////////////////////////////////////
                // Create a FormData here to store files and other parameters.
                const formData = new FormData();
                // tslint:disable-next-line:no-any
                formData.append('file', blobInfo.blob() as any);
                const req = new HttpRequest('POST', '/api/app/file/uploadfile', formData, {
                    withCredentials: true
                });
                // Always returns a `Subscription` object. nz-upload would automatically unsubscribe it at correct time.
                this.http.request(req).subscribe(
                    // tslint:disable-next-line no-any
                    (event: HttpEvent<any>) => {
                        if (event.type === HttpEventType.Response) {
                            succFun(event.body.path);
                        }
                    },
                    err => {
                        failFun(err);
                    }
                );


            },
            plugins: 'print preview   importcss  searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media  template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists  wordcount   imagetools textpattern noneditable help    charmap   quickbars  emoticons',
            mobile: {
                plugins: 'print preview powerpaste  importcss tinydrive searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media  template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists  wordcount   textpattern noneditable help   charmap mentions quickbars linkchecker emoticons '
            },
            menubar: 'file edit view insert format tools table  help',
            toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist  | forecolor backcolor    removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media  template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment code',
            autosave_ask_before_unload: true,
            autosave_interval: '30s',
            autosave_prefix: '{path}{query}-{id}-',
            autosave_restore_when_empty: false,
            autosave_retention: '2m',
            image_advtab: true,
            importcss_append: true,
            template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
            template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
            height: 600,
            image_caption: true,
            quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
            noneditable_noneditable_class: 'mceNonEditable',
            toolbar_mode: 'sliding',
            content_style: '.mymention{ color: gray; }',
            contextmenu: 'link image imagetools table configure',
            a11y_advanced_options: true,
        };

    }

    getAppSetting(name) {
        return name ? this.app[name] : this.app;
    }
    getUserSetting(name) {
        return name ? this.user[name] : this.user;
    }
    getLayoutSetting(name) {
        return name ? this.layout[name] : this.layout;
    }

    setAppSetting(name, value) {
        if (typeof this.app[name] !== 'undefined') {
            this.app[name] = value;
        }
    }
    setUserSetting(name, value) {
        if (typeof this.user[name] !== 'undefined') {
            this.user[name] = value;
        }
    }
    setLayoutSetting(name, value) {
        if (typeof this.layout[name] !== 'undefined') {
            return this.layout[name] = value;
        }
    }

    toggleLayoutSetting(name) {
        return this.setLayoutSetting(name, !this.getLayoutSetting(name));
    }

    getEditorSetting() {
        return this.editor;
    }

}


export enum ImageForUse {
    ArticleCover = 'ArticleCover',
    ProductMainImage = 'ProductMainImage',
    ProductOtherImage = 'ProductOtherImage'
}


