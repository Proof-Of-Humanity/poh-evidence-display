<p align="center">
  <b style="font-size: 32px;">PoH Evidence Display</b>
</p>

## Get Started

1.  Clone this repo.
3.  Run `yarn` to install dependencies and then `yarn start` to run the UI in development mode.

Remeber to provide dispute data on the URL. It should be a JSON object containing the arbitrator and arbitrable addresses, as well as the disputeID as follows:

```
?{"arbitrableContractAddress":"0xdeadbeef...","arbitratorContractAddress":"0xdeadbeef...","disputeID":"111"}
```

Which URL encoded and concatenated with the site's path would look something like:

`http://localhost:3000/index.html?{"arbitrableContractAddress":"0xd17DF10fef600E8bFe025234C26aB6789e41FcaA","arbitratorContractAddress":"0x60b2abfdfad9c0873242f59f2a8c32a3cc682f80","disputeID":"822"}`
