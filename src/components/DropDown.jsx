import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

export const DropDown = ({ label, id, items }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id={`${id}-selector`}>{label}</InputLabel>
            <Select
                sx={{ width: '100%' }}
                name={`${id}-selector`}
                labelId={`${id}-selector-label`}
                id={`${id}-selector`}
                label={`${id}-selector`}
                defaultValue=""
            >
                {items.map((item) => {
                    return (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    )
                })}
                {/* <MenuItem value={10}>Ten</MenuItem> */}
            </Select>
        </FormControl>
    )
}
