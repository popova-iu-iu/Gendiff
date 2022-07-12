### Hexlet tests and linter status:
[![Actions Status](https://github.com/popova-iu-iu/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/popova-iu-iu/frontend-project-lvl2/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/7f4267c8623d9f28cddd/maintainability)](https://codeclimate.com/github/popova-iu-iu/frontend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/7f4267c8623d9f28cddd/test_coverage)](https://codeclimate.com/github/popova-iu-iu/frontend-project-lvl2/test_coverage)


[![Node CI](https://github.com/popova-iu-iu/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/popova-iu-iu/frontend-project-lvl2/actions)

## Gendiff
#### Description
The project implements a utility to find differences in configuration files.

#### Setup
1. Clone this repository
 ``` 
 git clone git@github.com:popova-iu-iu/frontend-project-lvl2.git 
 ```
 
2. Install dependenses
```
make install
```
 
3. Link the package
```
make lint
```
 
 
#### Examples
```
gendiff --format json file1.json file2.json
```
[![asciicast](https://asciinema.org/a/GDXRjC2nPFFIKVVMueDRwlUgw.svg)](https://asciinema.org/a/GDXRjC2nPFFIKVVMueDRwlUgw)

```
gendiff --format plain file1.json file2.json
```
[![asciicast](https://asciinema.org/a/dZQKz21sIl1eYKvILvV2nYt6y.svg)](https://asciinema.org/a/dZQKz21sIl1eYKvILvV2nYt6y)

```
gendiff file1.json file2.json
```
[![asciicast](https://asciinema.org/a/rNGyIKxivYSUzWLmbcz1tIKjP.svg)](https://asciinema.org/a/rNGyIKxivYSUzWLmbcz1tIKjP)

#### Flat file

file1:

```
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```

file2:

```
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```

```
gendiff 'file1.json' 'file2.json'
```

[![asciicast](https://asciinema.org/a/fvKk5IqNBk6q28C4wWrTyG1NM.svg)](https://asciinema.org/a/fvKk5IqNBk6q28C4wWrTyG1NM)

```
gendiff 'file3.yml' 'file4.yml'
```
[![asciicast](https://asciinema.org/a/hFQwAEhjNTIBXndtXJAgY4dDv.svg)](https://asciinema.org/a/hFQwAEhjNTIBXndtXJAgY4dDv)
