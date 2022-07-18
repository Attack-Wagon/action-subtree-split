const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');

async function run() {
  try {
    const prefix = core.getInput('prefix');
    const branch = core.getInput('branch');
    const tag = core.getInput('tag');
    const execOptions = {ignoreReturnCode:true};

    core.info('Commit changes to subtree branch');
    var returnValue = await exec.exec('git', ['subtree', 'split', '--prefix=' + prefix, '--branch', branch], execOptions);
    if (returnValue != 0)
      throw new Error('Commit changes to upm [' + branch + '] branch failed: ' + string(returnValue));
    
    if (tag && tag.length !== 0)
    {
      core.info('Create version tag with: ' + tag);
      returnValue = await exec.exec('git', ['tag', tag, branch], execOptions);
      if (returnValue != 0)
        throw new Error('Creating version tag [' + tag + '] failed: ' + string(returnValue));
    }

    core.info('Push subtree branch');
    returnValue = await exec.exec('git', ['push', 'origin', branch, '--tags', '--force'], execOptions);
    if (returnValue != 0)
      throw new Error('Pushing [' + branch + '] branch failed: ' + string(returnValue));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
