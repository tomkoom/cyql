module Types {

  public type Time = Int;
  public type JobCounter = Nat;

  public type ProfileId = Principal;
  public type ProfileCounter = Nat;

  public type Profile = {
    accountId : Text;
    firstSignIn : Time;
    lastVisit : Time;
    signInMethod : Text;
  };

  public type Job = {
    // position
    title : Text;
    category : Text;
    description : Text;
    sourceUrl : Text;
    compensation : Text;
    equity : Text;

    // company
    companyName : Text;
    companyLogoUrl : Text;
    companyWebsite : Text;
    companyTwitter : Text;

    // application
    applicationUrl : Text;
    contactEmail : Text;
    contactTwitter : Text;
    contactDiscord : Text;

    // meta
    submitted : Time;
    edited : Time;
    publisher : Text;

    // FE: icapps_assets/src/State/jobs/job.js
  };
};
