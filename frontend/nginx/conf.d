server {
    lserver {
        
        listen 80;

        server_name alexsobolev.nomoredomains.work;

        location / {


                proxy_pass http://alexsobolev.nomoredomains.work:8081;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_hide_header Access-Control-Allow-Origin;
                add_header Access-Control-Allow-Origin "$http_origin" always;
                proxy_cache_bypass $http_upgrade;
        }

    }

} 