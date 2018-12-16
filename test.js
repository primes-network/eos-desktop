const fetch = require('cross-fetch');

(async () => {
  try {
    const res = await fetch('https://node.eosflare.io/v1/history/get_actions', {
      method: 'post',
      headers: {
        // Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pos: 0,
        offset: 3,
        account_name: 'dappinventor'
      })
    });

    console.log(await res.text());
    // const json = await res.json();
    // console.log(json.actions.length);
  } catch (err) {
    // console.log(err);
  }
})();
