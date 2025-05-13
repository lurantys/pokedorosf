const pokemonSprites = [
    "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/bulbasaur.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/ivysaur.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/ivysaur.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/venusaur.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/venusaur.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/charmander.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/charmeleon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/charmeleon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/charizard.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/squirtle.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/wartortle.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/wartortle.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/blastoise.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/blastoise.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/caterpie.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/caterpie.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/metapod.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/metapod.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/butterfree.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/butterfree.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/weedle.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/weedle.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/kakuna.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/kakuna.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/beedrill.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/beedrill.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/pidgey.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/pidgey.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/pidgeotto.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/pidgeotto.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/pidgeot.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/pidgeot.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/rattata.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/rattata.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/raticate.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/raticate.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/spearow.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/spearow.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/fearow.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/fearow.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/ekans.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/ekans.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/arbok.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/arbok.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/pikachu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/raichu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/raichu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/sandshrew.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/sandshrew.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/sandslash.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/sandslash.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/nidoran-f.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/nidoran-f.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/nidorina.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/nidorina.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/nidoqueen.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/nidoqueen.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/nidoran-m.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/nidoran-m.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/nidorino.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/nidorino.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/nidoking.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/nidoking.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/clefairy.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/clefairy.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/clefable.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/clefable.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/vulpix.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/vulpix.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/ninetales.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/ninetales.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/jigglypuff.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/jigglypuff.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/wigglytuff.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/wigglytuff.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/zubat.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/zubat.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/golbat.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/golbat.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/oddish.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/oddish.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/gloom.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/gloom.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/vileplume.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/vileplume.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/paras.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/paras.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/parasect.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/parasect.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/venonat.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/venonat.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/venomoth.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/venomoth.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/diglett.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/diglett.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/dugtrio.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/dugtrio.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/meowth.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/meowth.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/persian.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/persian.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/psyduck.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/psyduck.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/golduck.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/golduck.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/mankey.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/mankey.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/primeape.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/primeape.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/growlithe.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/growlithe.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/arcanine.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/arcanine.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/poliwag.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/poliwag.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/poliwhirl.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/poliwhirl.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/poliwrath.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/poliwrath.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/abra.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/abra.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/kadabra.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/kadabra.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/alakazam.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/alakazam.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/machop.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/machop.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/machoke.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/machoke.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/machamp.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/machamp.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/bellsprout.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/bellsprout.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/weepinbell.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/weepinbell.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/victreebel.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/victreebel.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/geodude.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/geodude.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/graveler.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/graveler.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/golem.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/golem.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/ponyta.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/ponyta.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/rapidash.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/rapidash.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/slowpoke.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/slowpoke.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/slowbro.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/slowbro.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/magnemite.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/magnemite.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/magneton.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/magneton.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/farfetchd.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/farfetchd.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/doduo.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/doduo.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/dodrio.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/dodrio.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/seel.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/seel.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/dewgong.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/dewgong.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/grimer.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/grimer.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/muk.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/muk.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/shellder.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/shellder.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/cloyster.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/cloyster.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/gastly.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/gastly.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/haunter.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/haunter.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/gengar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/gengar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/onix.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/onix.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/drowzee.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/drowzee.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/hypno.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/hypno.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/krabby.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/krabby.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/kingler.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/kingler.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/voltorb.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/voltorb.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/electrode.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/electrode.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/exeggcute.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/exeggcute.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/exeggutor.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/exeggutor.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/cubone.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/cubone.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/marowak.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/marowak.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/hitmonlee.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/hitmonlee.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/hitmonchan.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/hitmonchan.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/lickitung.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/lickitung.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/koffing.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/koffing.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/weezing.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/weezing.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/rhyhorn.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/rhyhorn.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/rhydon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/rhydon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/chansey.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/chansey.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/tangela.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/tangela.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/kangaskhan.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/kangaskhan.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/horsea.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/horsea.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/seadra.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/seadra.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/goldeen.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/goldeen.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/seaking.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/seaking.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/staryu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/staryu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/starmie.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/starmie.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/mrmime.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/mrmime.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/scyther.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/scyther.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/jynx.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/jynx.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/electabuzz.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/electabuzz.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/magmar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/magmar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/pinsir.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/pinsir.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/tauros.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/tauros.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/magikarp.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/magikarp.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/gyarados.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/gyarados.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/lapras.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/lapras.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/ditto.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/ditto.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/eevee.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/eevee.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/vaporeon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/vaporeon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/jolteon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/jolteon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/flareon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/flareon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/porygon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/porygon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/omanyte.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/omanyte.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/omastar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/omastar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/kabuto.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/kabuto.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/kabutops.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/kabutops.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/aerodactyl.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/aerodactyl.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/snorlax.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/snorlax.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/articuno.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/articuno.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/zapdos.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/zapdos.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/moltres.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/moltres.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/dratini.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/dratini.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/dragonair.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/dragonair.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/dragonite.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/dragonite.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/mewtwo.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/mewtwo.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/mew.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/mew.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/lucario.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/lucario.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/greninja.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/greninja.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/garchomp.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/garchomp.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/gardevoir.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/gardevoir.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/charizard.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/pikachu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/chikorita.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/chikorita.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/bayleef.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/bayleef.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/meganium.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/meganium.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/cyndaquil.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/cyndaquil.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/quilava.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/quilava.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/typhlosion.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/typhlosion.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/totodile.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/totodile.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/croconaw.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/croconaw.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/feraligatr.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/feraligatr.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/sentret.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/sentret.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/furret.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/furret.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/hoothoot.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/hoothoot.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/noctowl.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/noctowl.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/ledyba.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/ledyba.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/ledian.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/ledian.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/spinarak.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/spinarak.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/ariados.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/ariados.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/crobat.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/crobat.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/chinchou.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/chinchou.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/lanturn.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/lanturn.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/pichu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/pichu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/cleffa.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/cleffa.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/igglybuff.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/igglybuff.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/togepi.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/togepi.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/togetic.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/togetic.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/natu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/natu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/xatu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/xatu.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/mareep.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/mareep.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/flaaffy.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/flaaffy.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/ampharos.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/ampharos.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/bellossom.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/bellossom.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/marill.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/marill.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/azumarill.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/azumarill.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/sudowoodo.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/sudowoodo.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/politoed.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/politoed.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/hoppip.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/hoppip.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/skiploom.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/skiploom.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/jumpluff.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/jumpluff.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/aipom.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/aipom.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/sunkern.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/sunkern.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/sunflora.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/sunflora.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/yanma.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/yanma.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/wooper.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/wooper.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/quagsire.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/quagsire.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/espeon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/espeon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/umbreon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/umbreon.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/murkrow.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/murkrow.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/slowking.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/slowking.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/misdreavus.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/misdreavus.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/unown.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/unown.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/wobbuffet.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/wobbuffet.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/girafarig.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/girafarig.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/pineco.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/pineco.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/forretress.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/forretress.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/dunsparce.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/dunsparce.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/gligar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/gligar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/steelix.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/steelix.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/snubbull.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/snubbull.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/granbull.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/granbull.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/qwilfish.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/qwilfish.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/scizor.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/scizor.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/shuckle.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/shuckle.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/heracross.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/heracross.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/sneasel.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/sneasel.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/teddiursa.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/teddiursa.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/ursaring.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/ursaring.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/slugo.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/slugo.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/magcargo.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/magcargo.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/swinub.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/swinub.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/piloswine.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/piloswine.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/corsola.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/corsola.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/remoraid.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/remoraid.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/octillery.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/octillery.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/delibird.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/delibird.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/mantine.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/mantine.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/skarmory.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/skarmory.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/houndour.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/houndour.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/houndoom.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/houndoom.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/kingdra.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/kingdra.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/phanpy.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/phanpy.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/donphan.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/donphan.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/porygon2.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/porygon2.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/stantler.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/stantler.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/smeargle.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/smeargle.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/tyrogue.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/tyrogue.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/hitmontop.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/hitmontop.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/smoochum.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/smoochum.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/elekid.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/elekid.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/magby.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/magby.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/miltank.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/miltank.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/blissey.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/blissey.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/raikou.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/raikou.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/entei.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/entei.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/suicune.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/suicune.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/larvitar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/larvitar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/pupitar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/pupitar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/tyranitar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/tyranitar.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/lugia.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/lugia.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/ho-oh.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/ho-oh.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/normal/celebi.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/celebi.gif",
    "https://img.pokemondb.net/sprites/black-white/anim/shiny/pikachu.gif" 
]

let currentPokemon = null;

let isDarkMode = localStorage.getItem('darkMode') === 'true';

let timer;
let isRunning = false;
let timeLeft;
let isBreakTime = false;
let originalWorkDuration;

let workDuration = 25 * 60;
let shortBreakDuration = 5 * 60;
let longBreakDuration = 10 * 60;
let sessionCount = parseInt(localStorage.getItem('sessionCount')) || 0; // Load from localStorage

function playLevelUpSound() {
    const sound = document.getElementById('levelUpSound');
    if (!sound) {
        console.error('Sound element not found');
        return;
    }

    // Reset sound to start and set volume
    sound.currentTime = 0;
    sound.volume = 0.5;

    // Play sound with promise handling
    const playPromise = sound.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('Sound played successfully');
            })
            .catch(error => {
                console.error('Error playing sound:', error);
                // Improved error messaging
                if (error.name === 'NotAllowedError') {
                    console.log('Please interact with the page first');
                } else if (error.name === 'NotFoundError') {
                    console.error('Audio file not found');
                }
                // Fallback: try playing after user interaction
                document.addEventListener('click', () => {
                    sound.play().catch(e => console.error('Fallback play failed:', e));
                }, { once: true });
            });
    }
}

function startTimer() {
    const startBtn = document.getElementById('start-btn');
    const minutesInput = document.getElementById('minutes');
    
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = 'Pause';
        minutesInput.readOnly = true; 
        
        if (!timeLeft) {
            workDuration = parseInt(document.getElementById('work-time').value) * 60;
            shortBreakDuration = parseInt(document.getElementById('short-break-time').value) * 60;
            longBreakDuration = parseInt(document.getElementById('long-break-time').value) * 60;
            
            timeLeft = isBreakTime ? 
                (sessionCount % 3 === 0 ? longBreakDuration : shortBreakDuration) : 
                workDuration;
        }
        
        timer = setInterval(updateTimer, 1000);
    } else {
        isRunning = false;
        startBtn.textContent = 'Start';
        minutesInput.readOnly = false; 
        clearInterval(timer);
    }
}


function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = null;
    isBreakTime = false;
    sessionCount = 0; // Reset to default durations
    localStorage.setItem('sessionCount', sessionCount); // Save to localStorage
    

    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startBtn = document.getElementById('start-btn');
    const workTimeInput = document.getElementById('work-time');
    const shortBreakInput = document.getElementById('short-break-time');
    const longBreakInput = document.getElementById('long-break-time');
    
    minutesDisplay.textContent = '25';
    secondsDisplay.textContent = '00';
    startBtn.textContent = 'Start';
    
    workTimeInput.value = '25';
    shortBreakInput.value = '5';
    longBreakInput.value = '10';
    

    document.querySelector('.timer').classList.remove('break-time');
    document.getElementById('status').textContent = 'Work Time';
    

    const hpBar = document.querySelector('.hp-remaining');
    const currentHP = document.getElementById('current-hp');
    const maxHP = document.getElementById('max-hp');
    
    hpBar.style.width = '100%';
    hpBar.className = 'hp-remaining';
    currentHP.textContent = '25';
    maxHP.textContent = '25';
}


function updateHPBar(timeLeft, totalTime) {
    const hpBar = document.querySelector('.hp-remaining');
    if (!hpBar) return;

    requestAnimationFrame(() => {
        const percentage = (timeLeft / totalTime) * 100;
        hpBar.style.width = `${percentage}%`;
        hpBar.style.transition = 'width 0.5s linear';
        
        updateHPBarColor(percentage, hpBar);
    });
}

function updateHPBarColor(percentage, hpBar) {
    const colors = {
        low: percentage <= 20,
        medium: percentage <= 50,
        high: percentage > 50
    };
    
    hpBar.className = `hp-remaining ${
        colors.low ? 'low' : colors.medium ? 'medium' : ''
    }`;
}


function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        isBreakTime = !isBreakTime;
        
        const minutesInput = document.getElementById('minutes');
        const statusEl = document.getElementById('status');
        
        playLevelUpSound();
        if (isBreakTime) {
            sessionCount++;
            localStorage.setItem('sessionCount', sessionCount); // Save to localStorage
            timeLeft = sessionCount % 3 === 0 ? longBreakDuration : shortBreakDuration;
            document.querySelector('.timer').classList.add('break-time');
            statusEl.textContent = sessionCount % 3 === 0 ? 'Long Break' : 'Short Break';
        } else {
            // Use original duration when returning to work time
            timeLeft = workDuration;
            minutesInput.value = workDuration / 60;
            document.querySelector('.timer').classList.remove('break-time');
            statusEl.textContent = 'Work Time';
        }
        
        updateBadgeProgress();
        startTimer();
        return;
    }
    
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    updateHPBar(timeLeft, isBreakTime ? 
        (sessionCount % 3 === 0 ? longBreakDuration : shortBreakDuration) : 
        workDuration);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Initialize theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// Modify setRandomPokemon function to update info
function setRandomPokemon() {
    const randomIndex = Math.floor(Math.random() * (pokemonSprites.length / 2)) * 2;
    const isChromatic = Math.random() < 0.01; // 1% chance
    const pokemonImg = document.querySelector('.sprite');
    const spriteUrl = pokemonSprites[randomIndex + (isChromatic ? 1 : 0)];
    pokemonImg.src = spriteUrl;
    
    // Extract Pokemon name from sprite URL
    const pokemonName = spriteUrl.split('/').slice(-1)[0].split('.')[0].replace(/^0+/, '');
    currentPokemon = pokemonName;
    
    updatePokemonInfo(spriteUrl);
}

// Update updatePokemonInfo function in script.js
function updatePokemonInfo(spriteUrl) {
    const pokemonId = spriteUrl.split('/').slice(-1)[0].split('.')[0].replace(/^0+/, '');
    const infoContainer = document.querySelector('.pokemon-info-content');
    const isShiny = spriteUrl.includes('shiny'); // Check if the sprite URL contains 'shiny'
    
    infoContainer.querySelector('.pokemon-name').textContent = 'Loading...';
    infoContainer.querySelector('.pokemon-small-sprite').src = spriteUrl;
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(data => {
            const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const types = data.types.map(t => t.type.name.toUpperCase()).join(', ');
            const nameElement = infoContainer.querySelector('.pokemon-name');
            nameElement.textContent = name;
            if (isShiny) {
                const starSpan = document.createElement('span');
                starSpan.textContent = ' ★';
                starSpan.className = 'shiny-star';
                nameElement.appendChild(starSpan);
            }
            
            // Update name with shiny star if needed
            nameElement.textContent = name;
            if (isShiny) {
                const starSpan = document.createElement('span');
                starSpan.textContent = ' ★';
                starSpan.className = 'shiny-star';
                nameElement.appendChild(starSpan);
            }

            infoContainer.querySelector('.pokemon-type').textContent = `Type: ${types}`;
            data.stats.forEach(stat => {
                const statName = stat.stat.name.replace('-', '');
                if (['hp', 'attack', 'defense', 'speed'].includes(statName)) {
                    const statElement = infoContainer.querySelector(`.${statName}`);
                    if (statElement) {
                        statElement.textContent = stat.base_stat;
                    }
                }
            });
            
            return fetch(data.species.url);
        })
        .then(response => response.json())
        .then(speciesData => {
            const description = speciesData.flavor_text_entries
                .find(entry => entry.language.name === 'en')
                .flavor_text.replace(/\f/g, ' ');
            
            infoContainer.querySelector('.pokemon-description').textContent = description;

            const regionMap = {
                'generation-i': 'Kanto',
                'generation-ii': 'Johto',
                'generation-iii': 'Hoenn',
                'generation-iv': 'Sinnoh',
                'generation-v': 'Unova',
                'generation-vi': 'Kalos',
                'generation-vii': 'Alola',
                'generation-viii': 'Galar'
            };
            const region = regionMap[speciesData.generation.name] || speciesData.generation.name.toUpperCase();
            infoContainer.querySelector('.pokemon-region').textContent = `Region: ${region}`;
        })
        .catch(error => {
            console.error('Error fetching Pokemon data:', error);
            infoContainer.querySelector('.pokemon-name').textContent = 'Data unavailable';
        });
}


function playButtonSound() {
    const sound = document.getElementById('buttonSound');
    if (!sound) return;
    
    sound.currentTime = 0;
    sound.volume = 0.3;
    sound.play().catch(error => console.error('Error playing button sound:', error));
}


function startBackgroundMusic() {
    const bgMusic = document.getElementById('backgroundMusic');
    if (!bgMusic) return;
    
    bgMusic.volume = 0.1; // 90% lower volume
    

    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error('Error playing background music:', error);
            document.addEventListener('click', () => {
                bgMusic.play().catch(e => console.error('Background music autoplay failed:', e));
            }, { once: true });
        });
    }
}

let isMuted = false;

function toggleMute() {
    isMuted = !isMuted;
    const backgroundMusic = document.getElementById('backgroundMusic');
    const muteButton = document.getElementById('mute-btn');
    const soundIcon = muteButton.querySelector('.sound-icon');

    if (isMuted) {
        backgroundMusic.muted = true;
        soundIcon.src = "./icons/sound-off.png";
        soundIcon.alt = "Unmute";
    } else {
        backgroundMusic.muted = false;
        soundIcon.src = "./icons/sound-on.png";
        soundIcon.alt = "Mute";
    }
}

function updateDateTime() {
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const day = now.getDate();
    const month = months[now.getMonth()];
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'pm' : 'am';
    
    const suffix = ["th", "st", "nd", "rd"][(day % 10 > 3 ? 0 : day % 10)];
    
    document.getElementById('datetime').innerHTML = 
        `<span class="time">${hours}:${minutes} ${ampm}</span>
         <span class="date">${day}${suffix} of ${month}</span>`;
}

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function toggleTaskInput() {
    const inputWrapper = document.querySelector('.task-input-wrapper');
    const isHidden = inputWrapper.style.display === 'none';

    if (isHidden) {
        inputWrapper.style.display = 'block';
        // Get the actual height
        const height = inputWrapper.scrollHeight;
        // Set initial height to 0
        inputWrapper.style.height = '0';
        // Force a reflow
        inputWrapper.offsetHeight;
        // Set the actual height
        inputWrapper.style.height = height + 'px';
    } else {
        inputWrapper.style.height = '0';
        setTimeout(() => {
            inputWrapper.style.display = 'none';
        }, 300);
    }
}

function addTask(taskText) {
    const tasksList = document.getElementById('tasks-list');
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            taskItem.classList.add('completing');
            setTimeout(() => {
                taskItem.classList.add('task-completed');
            }, 300);
        } else {
            taskItem.classList.remove('task-completed');
            taskItem.classList.add('completing');
            setTimeout(() => {
                taskItem.classList.remove('completing');
            }, 300);
        }
    });

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-delete';
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', function() {
        taskItem.classList.add('removing');
        setTimeout(() => {
            tasksList.removeChild(taskItem);
        }, 300);
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(text);
    taskItem.appendChild(deleteBtn);
    tasksList.appendChild(taskItem);

    // Save tasks
    saveTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.push({
            text: taskItem.querySelector('.task-text').textContent,
            completed: taskItem.querySelector('.task-checkbox').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'task-completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            taskItem.classList.toggle('task-completed', task.completed);
            saveTasks();
        });
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-delete';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', () => {
            taskItem.classList.add('removing');
            setTimeout(() => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            }, 300);
        });
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteBtn);
        tasksList.appendChild(taskItem);
    });
}

document.getElementById('task-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const taskText = this.value.trim();
        if (taskText) {
            addTask(taskText);
            this.value = '';
            // Play button sound
            playButtonSound();
        }
    }
});

function updateTimerDisplay() {
    const workTime = parseInt(document.getElementById('work-time').value);
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    const hpBar = document.querySelector('.hp-remaining');
    const currentHP = document.getElementById('current-hp');
    const maxHP = document.getElementById('max-hp');

    minutes.textContent = workTime.toString().padStart(2, '0');
    seconds.textContent = '00';

    if (hpBar && currentHP && maxHP) {
        hpBar.style.width = '100%';
        currentHP.textContent = workTime;
        maxHP.textContent = workTime;
    }

    workDuration = workTime * 60;
    timeLeft = null; 
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    setRandomPokemon();
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', playButtonSound);
    });

    document.addEventListener('click', () => {
        startBackgroundMusic();
    }, { once: true });

    updateDateTime();
    setInterval(updateDateTime, 1000);
    renderTasks();
    const durationInputs = ['work-time', 'short-break-time', 'long-break-time'];
    durationInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => {
                if (id === 'work-time' && !isRunning) {
                    updateTimerDisplay();
                }
            });
        }
    });
    updateBadgeProgress();

    // Load saved theme on page load
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
});

// Add to script.js
function updateBadgeProgress() {
    const badges = document.querySelectorAll('.badge-wrapper');
    badges.forEach((badge, index) => {
        const requiredSessions = (index + 1) * 10;
        const tooltip = badge.querySelector('.badge-tooltip');
        if (tooltip) {
            tooltip.textContent = `${sessionCount}/${requiredSessions} sessions complete`;
            if (sessionCount >= requiredSessions) {
                badge.querySelector('.badge-icon').classList.add('earned');
            }
        }
    });
}

// Initialize badges on page load
document.addEventListener('DOMContentLoaded', () => {
    updateBadgeProgress();
});