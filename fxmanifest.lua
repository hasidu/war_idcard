fx_version 'adamant'

game 'gta5'

author 'Lorsan <lorsan.dev@gmail.com>'
description 'WAR IDCard'
version '1.0.0'

lua54 'yes'

shared_scripts {
    '@es_extended/imports.lua'
}

server_scripts {
	'server/server.lua',
}

client_scripts {
	'client/client.lua',
}


files {
    'html/build/*.html',
    'html/build/*.png',
    'html/build/manifest.json',
    'html/build/static/**/*',
} 

ui_page 'html/build/index.html'
