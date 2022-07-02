
# Protocol

## Background

When first experimenting with threads I found it easier to think of the thread wrapper as managing state.


## State Machine

```plantuml
:start;
:load_base_script;
:idle;
:load_require_and_job;
:execute_job;
:fail;
:success;
:complete;
```

## Message Triggers

```plantuml
App -> Jobs: start
Jobs -> Thread: load_base_script
Thread -> Jobs: loaded
Jobs -> Thread: load_require_and_job
Thread -> Jobs: job_ready
Jobs -> Thread: execute_job
Thread -> Jobs: fail
Thread -> Jobs: ok
Jobs -> App: status
```
