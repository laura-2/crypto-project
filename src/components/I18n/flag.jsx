const Flag = ({ image, isSelected, ...props }) => (
  <img alt="flag" src={image} className={isSelected ? 'flag selected' : 'flag'} {...props} width={50} height={50}
  style={{padding: '1%'}}/>
)

export default Flag