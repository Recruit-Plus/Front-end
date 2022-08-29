<Item  >
        <div className='container my-3' style={{backgroundColor:'#d50000',fontSize:'1.2rem',color:'white'}} >Topic</div>
        <div align='center' >
        <Root>
          {/* <div {...getRootProps()}>
            <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
              {value.map((option, index) => (
                <StyledTag label={option.topic} {...getTagProps({ index })} />
              ))}
              <input {...getInputProps()} />
            </InputWrapper>
          </div>
          
          */}

<Box sx={{ minWidth: 200 , maxHeight:47}}>
                    <FormControl sx={{  width: 200 }}>
                      <InputLabel id="demo-multiple-name-label" style={{color:'black'}}>Topic</InputLabel>
                      <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Name" />}
         
                    >
                    {/* {value.map((option, index) => (
                // <StyledTag label={option.topic} {...getTagProps({ index })} />
                <MenuItem
                  key={option}
                  value={option}>
                {option}
              </MenuItem>
              ))} */}
              <div {...getRootProps()}>
            <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
            {value.map((option, index) => (
              <>
                <StyledTag label={option.topic} {...getTagProps({ index })} />
                <MenuItem
                  key={option}
                  value={option}>
                {option}
              </MenuItem></>
              ))}
            <input {...getInputProps()} />
            </InputWrapper>
          </div>
         
                  






           <Box style={{ width: '25%' }}>
            {groupedOptions.length > 0 ? (
              <Listbox {...getListboxProps()} >
                <Button variant="contained" onClick={handleClickOpen} style={{backgroundColor:'black'}}>Add New Topic  </Button>
                {groupedOptions.map((option, index) => (
                  <li {...getOptionProps({ option, index })}>
                    <span>{option.topic}</span>
                    <CheckIcon fontSize="small" />
                  </li>
                ))}
              </Listbox>
            ) : null}
            </Box>  
            

            </Select>
                  </FormControl>
                </Box>


        </Root>
      </div>
    </Item>