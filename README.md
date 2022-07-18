# Git Subtree Split

Used to perform a subtree split on a specific folder in your current repo.  This is mainly used to create a branch within the repo on a specific folder for certain use cases.

## Usage

Use the action inside your workflow yaml file like this:

```yaml
...
- name: Subtree Split
    uses: Attack-Wagon/action-subtree-split@v1
    with: 
        prefix: 'Web/'
        branch: 'web'
        tag: 'v.1.0.0'
...

```

## Input Parameters

* **prefix:** Name of the folder to perform the subtree split on.
* **branch:** Name of the branch that the subtree split will be sent to.
* **tag:** OPTIONAL: Use thie parameter if you want to also add a tag to the subtree branch.
