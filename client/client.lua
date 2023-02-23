Client = {}

function Client:Init()
    local o = {}
    setmetatable(o, {__index = Client})
    o:Event()
    o:NuiCallback()
    o:Command() -- Production turn off or delete
    return o
end

function Client:Event()
    RegisterNetEvent("war_idcard:client:isOpenIDCard", function(data)
        self.dataIDCard = data
        self.dataIDCard.show = true
        self.dataIDCard.photo = ""
        self:OpenIDCard()
    end)
end

function Client:NuiCallback()
    RegisterNUICallback("CloseNUI", function()
        self:CloseIDCard()
    end)
end

function Client:OpenIDCard()
    if not self.dataIDCard then return end
    SetNuiFocus(true, true)
    SendNUIMessage({
        component = "IDCard",
        event = "setData",
        data = self.dataIDCard
    })
end

function Client:CloseIDCard()
    self.dataIDCard = nil
    SetNuiFocus(false, false)
end

function Client:Command() -- Production turn off or delete
    RegisterCommand('testidcard', function()
        TriggerServerEvent("war_idcard:server:getDataIDCard", GetPlayerServerId(PlayerId()))
    end)
end


Citizen.CreateThread(function()
    while not ESX.IsPlayerLoaded() do Wait(1) end 
    Client:Init()
end)