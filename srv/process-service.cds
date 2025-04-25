using my from '../db/data-model';
service ProcessService {
  entity Processes as projection on my.Processes;
  entity Activities as projection on my.Activities;
  entity ProcessLinks as projection on my.ProcessLinks;
  action createDeepProcess(process: Processes) returns String;
}
