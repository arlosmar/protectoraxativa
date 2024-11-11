<html>
    <head>        
        <!--<link href="{{ URL::asset('css/mail.css'); }}" rel="stylesheet">-->
        <style>   
            #title{
                font-size: 20px;
                margin: 0;
                border-bottom: 1px solid #BBBBBB;
            }

            #contact-email-div{
                width: 100%;
                max-width: 400px;
                margin: auto;
                text-align: center;
                background-color: #EEEEEE;
                border: 1px solid #000000;
                border-radius: 5px;
                padding: 5px;
            }         
        </style>
    </head>
    <body>
        @yield('template')
    </body>
</html>