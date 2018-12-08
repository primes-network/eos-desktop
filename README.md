# eoswallet

## start keosd

```
keosd &
```

## start the nodeos

```
nodeos -e -p eosio \
--plugin eosio::producer_plugin \
--plugin eosio::chain_api_plugin \
--plugin eosio::http_plugin \
--plugin eosio::history_api_plugin \
-d $CONTRACTS_DIR/eosio/data \
--config-dir $CONTRACTS_DIR/eosio/config \
--access-control-allow-origin=* \
--contracts-console \
--http-validate-host=false \
--filter-on='*' >> $CONTRACTS_DIR/nodeos.log 2>&1 &
```
