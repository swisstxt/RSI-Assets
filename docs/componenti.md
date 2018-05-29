---
title: COMPONENTI
label: Componenti
---

<br />
<br />
# 1. Definizione

Il componente è un elemento che ha lo scopo di formare un insieme più grande. Si può immaginare il componente come un pezzo del lego che unito ad altri pezzi formano un'insieme più grande e complesso. Questo concetto può essere spinto all'estremo ma non è il nostro caso. Utilizziamo il concetto di componenti al fine di evitare ripetizioni nel codice, velocizzare lo sviluppo e mantenere ordine nel progetto. L'icona play all'interno di un sito si ripete svariate volte la cosa migliore è perciò creare un componente univoco che viene richiamato là dove serve, qualora sia necessario modificare l'icona play sarà sufficiente cambiare il singolo componente affinché la modifica si ripercuota sull'intero sito.    




<br />
<br />
# 2. Nomencaltura

La nomenclatura dei componenti inizia sempre con la particella `c-` a cui si aggiunge il nome identificativo del componente ad esempio `c-fieldSearch`. Per la seconda parte del nome si utilizza il sistema **camel case**.<br />
Al contenitore principale di ogni componente viene assegnata la classe con il suo nome specifico, ad esempio:
<br />
<br />
`<div class="c-fieldSearch">`<br />
	`...`<br />
`</div>`<br />




<br />
<br />
# 3. Scelta del nome
La scelta del nome dev'essere fatta basandosi sulla **funzionalità** del componente stesso e non la sua collocazione o utilizzo. Un nome errato sarebbe `c-galleryNews` dal momento che il componente potrebbe essere utilizzato anche in pagine che non sono di news. <br />
Allo stesso tempo il nome non d'evessere troppo generico, onde evitare nomi non esplicativi o il ripetitivi, come `c-teaser1`, `c-teaser2`,... un nome estremamanete generico può essere utilizzato qualora il componente che si sta andando a creare sarà univoco e specifico all'interno del sito, ad esempio `c-playIcon`, in questo caso si tratta dell'icona play che resterà uguale all'interno dell'intero progetto, ciò che può variare sono le dimensioni o il colore che però sono versioni dello stesso componente e possono essere gestite al suo interno.




<br />
<br />
# 4. Versioni
Un componente può avere delle versioni che ne modificano dimensione, colore o altri elementi a condizione che la struttura HTML non sia sconvolta. Nel caso in cui vogliamo creare una versione di un componente dobbiamo espletare questa versione aggiungendo alla fine del componente il nome della versione, preceduta dal glifo `-`. Se ad esempio vogliamo creare delle versioni del componente `c-sectionTitle` possono esse dichiarate in questo modo: 
<br />
<br />
`c-sectionTitle-light`<br />
`c-sectionTitle-xs`
<br />
<br />
Per declinare il componente in una di queste versioni basta inserire la classe specifica dopo quella di default, in questo modo:
<br />
<br />
`<div class="c-sectionTitle`**`c-sectionTitle-light`**`">`<br />
`...`<br />
`</div>`<br />
<br />
<br />
La classe della versione si va ad aggiungere a quella di default e **non la sostituisce**. In questo modo è possibile sommare più versioni, come da esempio:
<br />
<br />
`<div class="c-sectionTitle`**`c-sectionTitle-light c-sectionTitle-xs`**`">`<br />
	`...`<br />
`</div>`<br />

## Versioni per breakpoint
Può capitare di dover creare una versione particolare per uno specifico breakpoint, in questo caso la distinzione è fatta mettendo alla fine la `@` seguita dal breakpoint a cui ci vogliamo riferire, ad esempio:
<br />
<br />
`<div class="c-sectionTitle`**`c-sectionTitle-stripe@xs`**`">`<br />
	`...`<br />
`</div>`
<br />
<br />
In questo esempio il componente `c-sectionTitle` utilizzerà la versione `stripe` al breakpoint `xs`. I quattro breakpoint identificabili sono `@xs`, `@sm`, `@md`, `@lg`.



<br />
<br />
# 5. Classi interne
Le classi interne al componente servono a distinguere le diverse parti dello stesso. La regola esige che ogni classe inizi con il nome del componente stesso, se torniamo all'esempio del componente `c-sectionTitle` per identificare la parte html di una label le assegneremo la classe in questo modo `c-sectionTitle_label`. Ogniqualvolta ci riferiamo ad un elemento che è figlio del wrapper principale utilizziamo `_` per separare le due parti mentre usiamo `-` quando vogliamo identificare una versione differente dell'elemento, come si vede in questo esempio completo:
<br />
<br />
`<div class="c-sectionTitle">`<br />
	`<div class="`**`c-sectionTitle_label c-sectionTitle_label-noShadow`**`">`<br />
	`...`<br />
	`</div>`<br />
`</div>`<br />
<br />
<br />
Dev'essere specificata una classe per ogni elemento sul quale è necessario apportare delle modifiche css, infatti nel css non ci si può riferire agli elementi attraverso il proprio tag come `a`, `div`, `img`, o altri. Questo garantisce una mantenibilità qualora bisogna cambiare il tipo di tag.




<br />
<br />
# 6. SASS
Per la creazione del css ci serviamo di sass (Syntactically Awesome Style Sheets). Sfruttando il sistema di classi espletato precedentemente evitiamo qualsiasi tipo di dipendenza classica del css, se vogliamo riferirci ad un elmento specifico utilizziamo la classe creata, ad esempio `c-sectionTitle_label` che per sua natura sarà univoca all'interno dell'intero sito. Non utilizziamo perciò un sistema di annidiamento che indica quali sono i genitori ed i rispettivi figli, in questo modo non creiamo dipendenza tra gli elementi e modificando l'html non andiamo ad impattare sul sass. 




