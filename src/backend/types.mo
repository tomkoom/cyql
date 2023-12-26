module {

  // users

  public type UserId = Principal;
  public type User = {
    id : Text
  };

  // projects

  public type ProjectId = Nat;
  public type Project = {
    id : Nat;
    // id : Text;
    submittedBy : Text;
    createdAt : Text;
    updatedAt : Text;
    name : Text;
    description : Text;
    category : [Text];
    logo : Text;
    website : Text;
    canister : Text;
    twitter : Text;
    discord : Text;
    telegram : Text;
    github : Text;
    medium : Text;
    dscvr : Text;
    distrikt : Text;
    openchat : Text;
    taggr : Text;
    seers : Text;
    nuance : Text;
    catalyze : Text;
    funded : Text;
    app : Text;
    docs : Text;
    faq : Text;
    whitepaper : Text;
    grantee : Bool;
    archived : Bool;
    nftSaleDate : Text;
    nftSaleUrl : Text;
    nftUnits : Text;
    nftUnitPrice : Text;
    nftMarketEntrepot : Text;
    nftMarketCcc : Text;
    nftMarketYumi : Text;
    nftRarityDgdg : Text;
    nftStatsNftgeek : Text;
    nftImg1 : Text;
    nftImg2 : Text;
    nftImg3 : Text;
    nftImg4 : Text;
    upvotedBy : [Text]

    // to add:
    // tokenCanister
  }
}