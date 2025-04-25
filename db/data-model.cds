using { managed } from '@sap/cds/common';
namespace my;
entity Processes: managed {
  key ID : UUID;
  process: String @mandatory;
  description: String;
  state: String;
  activities: Association to many Activities on activities.process = $self;
  links: Composition of many ProcessLinks on links.process = $self;
  // works when i have @cds.validate :false
  // links: Composition of many ProcessLinks on links.process = $self @cds.validate : false ;
}

entity Activities: managed {
  key ID : UUID;
  process: Association to one Processes;
  description: String;
  state: String;
}

entity ProcessLinks: managed {
  key ID :UUID;
  process: Association to one Processes;
  sequence: Integer;
  fromActivity: Association to one Activities;
  toActivity: Association to one Activities;
}
