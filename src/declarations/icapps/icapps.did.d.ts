import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type CanisterCyclesAggregatedData = Array<bigint>;
export type CanisterHeapMemoryAggregatedData = Array<bigint>;
export type CanisterLogFeature = { 'filterMessageByContains' : null } |
  { 'filterMessageByRegex' : null };
export interface CanisterLogMessages {
  'data' : Array<LogMessagesData>,
  'lastAnalyzedMessageTimeNanos' : [] | [Nanos],
}
export interface CanisterLogMessagesInfo {
  'features' : Array<[] | [CanisterLogFeature]>,
  'lastTimeNanos' : [] | [Nanos],
  'count' : number,
  'firstTimeNanos' : [] | [Nanos],
}
export type CanisterLogRequest = { 'getMessagesInfo' : null } |
  { 'getMessages' : GetLogMessagesParameters } |
  { 'getLatestMessages' : GetLatestLogMessagesParameters };
export type CanisterLogResponse = { 'messagesInfo' : CanisterLogMessagesInfo } |
  { 'messages' : CanisterLogMessages };
export type CanisterMemoryAggregatedData = Array<bigint>;
export interface CanisterMetrics { 'data' : CanisterMetricsData }
export type CanisterMetricsData = { 'hourly' : Array<HourlyMetricsData> } |
  { 'daily' : Array<DailyMetricsData> };
export interface DailyMetricsData {
  'updateCalls' : bigint,
  'canisterHeapMemorySize' : NumericEntity,
  'canisterCycles' : NumericEntity,
  'canisterMemorySize' : NumericEntity,
  'timeMillis' : bigint,
}
export interface GetLatestLogMessagesParameters {
  'upToTimeNanos' : [] | [Nanos],
  'count' : number,
  'filter' : [] | [GetLogMessagesFilter],
}
export interface GetLogMessagesFilter {
  'analyzeCount' : number,
  'messageRegex' : [] | [string],
  'messageContains' : [] | [string],
}
export interface GetLogMessagesParameters {
  'count' : number,
  'filter' : [] | [GetLogMessagesFilter],
  'fromTimeNanos' : [] | [Nanos],
}
export interface GetMetricsParameters {
  'dateToMillis' : bigint,
  'granularity' : MetricsGranularity,
  'dateFromMillis' : bigint,
}
export interface HourlyMetricsData {
  'updateCalls' : UpdateCallsAggregatedData,
  'canisterHeapMemorySize' : CanisterHeapMemoryAggregatedData,
  'canisterCycles' : CanisterCyclesAggregatedData,
  'canisterMemorySize' : CanisterMemoryAggregatedData,
  'timeMillis' : bigint,
}
export interface Job {
  'compensation' : string,
  'company_twitter' : string,
  'title' : string,
  'submitted' : string,
  'application_twitter' : string,
  'publisher' : string,
  'company_website' : string,
  'company_name' : string,
  'description' : string,
  'category' : string,
  'application_email' : string,
  'application_discord' : string,
  'equity' : string,
  'application_url' : string,
  'company_logo_url' : string,
}
export type JobCounter = bigint;
export interface LogMessagesData { 'timeNanos' : Nanos, 'message' : string }
export type MetricsGranularity = { 'hourly' : null } |
  { 'daily' : null };
export type Nanos = bigint;
export interface NumericEntity {
  'avg' : bigint,
  'max' : bigint,
  'min' : bigint,
  'first' : bigint,
  'last' : bigint,
}
export interface Profile {
  'accountId' : string,
  'lastSignIn' : Time,
  'firstSignIn' : Time,
  'principalIdStr' : string,
  'signInMethod' : string,
}
export type ProfileErr = { 'IsAnonymous' : null };
export type ProfileId = Principal;
export type Result = { 'ok' : null } |
  { 'err' : ProfileErr };
export type Time = bigint;
export type UpdateCallsAggregatedData = Array<bigint>;
export interface _SERVICE {
  'addJob' : ActorMethod<[Job], Job>,
  'collectCanisterMetrics' : ActorMethod<[], undefined>,
  'getCanisterLog' : ActorMethod<
    [[] | [CanisterLogRequest]],
    [] | [CanisterLogResponse],
  >,
  'getCanisterMetrics' : ActorMethod<
    [GetMetricsParameters],
    [] | [CanisterMetrics],
  >,
  'getJobs' : ActorMethod<[], Array<[JobCounter, Job]>>,
  'getJobsNum' : ActorMethod<[], bigint>,
  'getProfile' : ActorMethod<[], [] | [Profile]>,
  'getProfiles' : ActorMethod<[], Array<[ProfileId, Profile]>>,
  'updateProfiles' : ActorMethod<[ProfileId, Profile], Result>,
  'whoami' : ActorMethod<[], string>,
}
