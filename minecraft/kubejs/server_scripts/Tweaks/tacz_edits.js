TaCZServerEvents.gunDataLoad((event) => {
    const id = event.getId().toString();

    if (id === "tacz:spas_12_data") {
        const json = JSON.parse(event.getStdJson());
        json.bullet_amount = 12;
        json.bullet.damage = 50;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 10, damage: 45 },
            { distance: 25, damage: 25 },
            { distance: "infinite", damage: 5 },
        ];
        return event.setJson(JSON.stringify(json));
    }

    if (id === "tacz:m1014_data") {
        const json = JSON.parse(event.getStdJson());
        json.bullet_amount = 10;
        json.bullet.damage = 48;
        return event.setJson(JSON.stringify(json));
    }

    if (id === "tacz:m870_data") {
        const json = JSON.parse(event.getStdJson());
        json.bullet_amount = 18;
        json.bullet.damage = 45;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 18, damage: 40 },
            { distance: 32, damage: 27 },
            { distance: "infinite", damage: 18 }
        ];
        return event.setJson(JSON.stringify(json));
    }

    if (id === "tacz:db_short_data") {
        const json = JSON.parse(event.getStdJson());
        json.bullet.damage = 45;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 6, damage: 40 },
            { distance: 15, damage: 20 },
            { distance: "infinite", damage: 10 },
        ];
        return event.setJson(JSON.stringify(json));
    }

    if (id === "tacz:db_long_data") {
        const json = JSON.parse(event.getStdJson());
        json.bullet_amount = 8;
        json.bullet.damage = 45;
        json.bullet.extra_damage.damage_adjust = [
            { distance: 16, damage: 35 },
            { distance: 24, damage: 25 },
            { distance: "infinite", damage: 10 }
        ];
        return event.setJson(JSON.stringify(json));
    }
})