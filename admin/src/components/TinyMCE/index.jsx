import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMCE = ({ content, handleChange }) => {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey="fesiryhet3ikqikz2o3snrgjbkdmxm4eu6t5yh3t1s12mmdu"
      onInit={(_, editor) => (editorRef.current = editor)}
      onEditorChange={(data) => {
        handleChange({ name: "content", value: data });
      }}
      value={content}
      init={{
        width: "100%",
        menubar: true,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
          "template",
        ],
        content_style:
          "*{ margin: 0; padding: 0;}" +
          "p { margin-bottom: 30px}" +
          "p.sm { font-size: 13px}" +
          "p.side-border { margin-bottom: 40px; margin-left: 18px; padding-left: 17px; border-left: 5px solid #e5e5e5}" +
          "b { font-weight: bolder}" +
          "h2.lg { position: relative; margin: 70px 0 40px; padding: 16px 0 16px 22px; font-size: 20px; font-weight: 700; line-height: 1.75} h2.lg:before { content: ''; position: absolute; top: 0; bottom: 0; left: -5px; width: 10px; height: 100%; margin: auto; background: #fff100}" +
          "h2.md { margin: 54px 0 27px; font-size: 18px; font-weight: 700}" +
          "h2.sm { margin: 32px 0 16px; font-size: 16px; font-weight: 700; line-height: 1.9}" +
          "h3 { margin: 40px 0 20px; font-size: 16px; font-weight: 700;}" +
          "hr { margin: 30px 0;}" +
          "a { color: #09c; text-decoration: underline;} a:hover { color: #078; text-decoration: none;}" +
          "figure.block-iframe, figure.block-video{margin-bottom: 40px; line-height: 0; text-align: center;}figure.block-iframe iframe, figure.block-video iframe{width: 690px; height: 388px; margin: 0 auto;}figure.block-iframe figcaption, figure.block-video figcaption{display: inline-block; max-width: 100%; margin: 10px 0; color: #666; font-size: 13px; line-height: 1.6; text-align: justify; line-break: loose;}figure.block-image{margin-bottom: 40px; line-height: 0; text-align: center;}figure.block-image img{display: block; max-width: 100%; margin: auto; height: auto;}figure.block-image figcaption{display: inline-block; max-width: 100%; margin: 10px 0; color: #666; font-size: 13px; line-height: 1.6; text-align: justify; line-break: loose;}figure.block-image.resized{display: table; margin-left: 0; margin-right: 0;}" +
          ".profile{position: relative; background-color: #f8f8f8; padding: 30px 30px 30px 150px; margin: 0 0 20px;}.profile dl{margin-bottom: 0;}.profile dl dt{margin-bottom: 10px; line-height: 1;}.profile dl dt .info{margin-bottom: 0;}.profile dl dt .team{font-size: 14px; color: #666; display: block; margin-bottom: 8px;}.profile dl dt .name{font-size: 22px;}.profile dl dt .wrapper-img{position: absolute; top: 30px; left: 30px; width: 100px; height: 100px; border-radius: 50px; text-align: center; overflow: hidden;}.profile dl dt .wrapper-img img{width: 100%; height: auto;}.profile dl dd{font-size: 14px;}.profile dl dt .info{display: flex; flex-flow: column-reverse; width: 100%;}.profile dl dt .info .team{margin-bottom: 0;}.profile dl dt .info .name{margin-bottom: 8px;}" +
          "strong { font-weight: 700; font-style: normal; background: linear-gradient(transparent 78%, #fff100 0); }" +
          "blockquote { display: block; margin-block-start: 1em; margin-block-end: 1em; margin-inline-start: 40px; margin-inline-end: 40px;}" +
          ".speech-bubble { position: relative; min-height: 60px; padding-top: 13px; margin: 0 0 20px; box-sizing: border-box;}.speech-bubble dt{font-size: 12px; font-weight: 700;}.speech-bubble dt .wrapper-img{display: block; width: 60px; height: 60px; border-radius: 30px; margin: 0; overflow: hidden; position: absolute; top: 0;}.speech-bubble dt .wrapper-img img{width: 100%; height: auto;}.speech-bubble dd{position: relative; border: 1px solid #ddd; padding: 22px; font-size: 16px;}.speech-bubble dd:before{position: absolute; top: -1px; content: ''; border: 10px solid transparent; border-top: 10px solid #ddd;}.speech-bubble dd:after{position: absolute; top: 0; content: ''; border: 10px solid transparent; border-top: 10px solid #fff;}.speech-bubble dd p{margin-bottom: 1em;}.speech-bubble.face-left{padding-left: 75px;}.speech-bubble.face-left dt{text-align: left;}.speech-bubble.face-left dt .wrapper-img{left: 0;}.speech-bubble.face-left dd:before{left: -11px;}.speech-bubble.face-left dd:after{left: -9px;}.speech-bubble.face-right{padding-right: 75px;}.speech-bubble.face-right dt{text-align: right;}.speech-bubble.face-right dt .wrapper-img{right: 0;}.speech-bubble.face-right dd:before{right: -11px;}.speech-bubble.face-right dd:after{right: -9px;}" +
          "table { width: 100%; margin: 0 0 20px; border: 1px solid #000; border-collapse: collapse;}table tr:first-child td{padding: 8px 3px; color: #fff; background-color: #000; text-align: center;}table td{padding: 8px 3px; border: 1px solid #000;}table th{padding: 8px 3px; color: #fff; background-color: #000;}" +
          ".link-btn { display: block; text-align: center; margin-bottom: 20px;}.link-btn a{position: relative; display: inline-block; box-sizing: border-box; border: 3px solid #000; border-radius: 40px; padding: 20px 60px 19px; width: 100%; text-align: center; background-color: #000; color: #fff; font-weight: 700; font-size: 14px; text-decoration: none;}.link-btn a:after{content: ''; display: block; background: url('https://cygames-magazine.netlify.app/static/media/icon_arrow_right-white.8f548b8fcc122aef0703.svg'); background-position: 50%; background-size: 100% auto; background-repeat: no-repeat; width: 14.7px; height: 12.7px; position: absolute; top: 0; bottom: 0; right: 40px; margin: auto;}.link-btn a:hover{background-color: #fff; color: #000; opacity: 1;}.link-btn a:hover:after{background: url('https://cygames-magazine.netlify.app/static/media/icon_arrow_right-black.9a2361e74d88bebe9211.svg'); background-position: 50%; background-size: 100% auto; background-repeat: no-repeat;}" +
          ".linkcard { margin: 0 0 20px;}.linkcard a{text-decoration: none;}.linkcard a:hover{opacity: 0.5;}.linkcard a:hover .image{transform: scale(1.1);}.linkcard .card{padding: 1em; border: 1px solid #888;}.linkcard .content{display: flex; margin-bottom: 0.8em;}.linkcard .image{width: 150px; margin: 0 14px 0 0; transition: transform 0.4s ease;}.linkcard .image img{width: 150px; max-height: 158px; border-radius: 2px;}.linkcard .title{color: #111; font-size: 16px; line-height: 18px; font-weight: bold;}.linkcard .title:hover{text-decoration: underline;}.linkcard .excerpt{margin-top: 0.8em; color: #666; font-size: 12px; line-height: 14px;}.linkcard .info{display: flex; align-items: center;}.linkcard .favicon{width: 16px; height: 16px;}.linkcard .domain, .linkcard .date{color: #222; font-size: 12px; line-height: 12px;}.linkcard .domain{margin-left: 0.2em;}.linkcard .date{flex: 1; text-align: right;}",
        toolbar:
          "undo redo | blocks | " +
          "fontsize |" +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help |" +
          "image | template",
        style_formats: [
          {
            title: "Block P",
            items: [
              { title: "p", block: "p" },
              { title: "p(sm)", block: "p", classes: ["sm"] },
              {
                title: "p(side-border)",
                block: "p",
                classes: ["side-border"],
              },
            ],
          },
          {
            title: "Block h2",
            items: [
              { title: "h2(lg)", block: "h2", classes: ["lg"] },
              { title: "h2(md)", block: "h2", classes: ["md"] },
              { title: "h2(sm)", block: "h2", classes: ["sm"] },
            ],
          },
          {
            title: "Block strong",
            items: [{ title: "strong", block: "strong" }],
          },
        ],
        templates: [
          {
            title: "Profile",
            description: "Block profile",
            content:
              '<section class="profile"><dl><dt><div class="info"><span class="team">Illustration Team</span><span class="name">Midori</span></div><div class="wrapper-img"> <img alt="" src="https://res.cloudinary.com/nt1110/image/upload/v1666708045/cygames-magazine/3719/ljrl0sohzyq195otbveg.jpg"> </div></dt><dd>After spending her student years studying advertising &amp; web graphic design, Midori is now in charge of illustrations for Cygames’ ongoing titles. Midori’s specialties are male characters and food.</dd></dl></section>',
          },
          {
            title: "Speech Bubble",
            description: "Block speech-bubble",
            content:
              '<dl class="speech-bubble face-left"> <dt> <div class="wrapper-img"> <img alt="" src="https://res.cloudinary.com/nt1110/image/upload/v1666585391/cygames-magazine/3695/3695_2_bhpwpd_az3bms.jpg"> </div><span>Asumi</span> </dt> <dd>I actually had about eight different ideas for the March theme when I first started—warbling white-eyes, graduation ceremonies, White Day, peach blossoms, and the list goes on. I settled on Hinamatsuri because it seemed to be the best expression of March in Japan, but I decided to add in some warbling white-eyes while I was at it.</dd></dl>',
          },
          {
            title: "Image",
            description: "Block image",
            content:
              '<figure class="block-image mceEditable"> <img alt="" src="https://res.cloudinary.com/nt1110/image/upload/v1666582522/cygames-magazine/2279/2279_2_ofk0mg_sietqz.png"></figure>',
          },
          {
            title: "Video",
            description: "Block video",
            content:
              '<figure class="block-video"> <video controls="" controlslist="nodownload" src="https://res.cloudinary.com/nt1110/video/upload/v1666584619/cygames-magazine/3511/staymoon_fzz0sl_biwpxr.mp4"></video>',
          },
          {
            title: "Iframe",
            description: "Block iframe",
            content:
              '<figure class="block-iframe"> <iframe width="560" height="315" src="https://www.youtube.com/embed/GftT_wzRJdc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          },
          {
            title: "Download button",
            description: "Block download button",
            content:
              '<span class="link-btn"> <a href="https://res.cloudinary.com/nt1110/image/upload/v1666585394/cygames-magazine/3695/iphone_zrjgrb_zlymcd.jpg" target="_blank" rel="noreferrer noopener" aria-label="(新しいタブで開く)">For iPhone/1125 x 2436</a></span>',
          },
          {
            title: "Link card",
            description: "Block link card",
            content:
              '<div class="linkcard"> <a href="https://magazine.cygames.co.jp/en/archives/3001"> <div class="card"> <div class="content"> <div class="image"> <img src="//magazine.cygames.co.jp/en/wp-content/uploads/2020/03/c686ab432f3291e71c775cd387cf2155-300x200.png" alt=""> </div><div> <div class="title"> An Interview with Shadowverse\'s Director: Development of a Digital Card ... </div><div class="excerpt"> The digital card game Shadowverse celebrated its third birthday in June 2019.While featuring characteristics offered by digital content such as casual smartphone play, Shadowverse has also been actively making inroads into the world of esports. Th... </div></div></div><div class="info"> <img class="favicon" src="https://www.google.com/s2/favicons?domain=https://cygames-magazine.netlify.app" alt=""> <div class="domain">Cygames Magazine | Cygames</div><div class="date">2019.10.08</div></div></div></a> </div>',
          },
        ],
        allow_html_in_named_anchor: true,
        valid_children: "+a[div],+a[span],+a[img]",
        extended_valid_elements: "a[*]",
        end_container_on_empty_block: true,
        image_caption: true,
      }}
    />
  );
};

export default TinyMCE;
