Server = {}

function Server:Init()
    local o = {}
    setmetatable(o, {__index = Server})
    o:Event()
    return o
end

function Server:Event()
    RegisterNetEvent("war_idcard:server:getDataIDCard", function(playerId)
        local xPlayer = ESX.GetPlayerFromId(source)
        local Player = ESX.GetPlayerFromId(playerId)
        local dataCall = {}
        if Player then 
            dataCall = { 
                player_info = {
                    firstname = xPlayer.get("firstName"),
                    lastname = xPlayer.get("lastName"),
                    sex = xPlayer.get("sex"),
                    age = xPlayer.get("dateofbirth"),
                    nation = 'US',
                    regist = '',
                    idcard = '000'..playerId..'000',
                    subscribe = xPlayer.get("lastName"),
                    img = false,
                }
            }
            TriggerClientEvent("war_idcard:client:isOpenIDCard", source, dataCall)
        else
            xPlayer.showNotification("Player Not Found")
        end
    end)
end

rt = Server:Init()