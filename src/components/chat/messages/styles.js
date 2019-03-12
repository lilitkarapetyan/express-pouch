import { StyleSheet } from 'aphrodite/no-important'

export default StyleSheet.create({
  main: {
    height: '320px',
    position: 'relative',
    paddingTop: '0.1px',
    ":after": {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: "100%",
      height: '20px',
      top: '100%',
      background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%)",
      left: '0',
    },
    ":before": {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: "100%",
      height: '20px',
      bottom: '100%',
      left: '0',
      zIndex: '2',
      background: "linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%)",
    }
  },
  container: {
    position: 'absolute',
    maxHeight: '100%',
    height: 'auto',
    left: '0',
    bottom: '0',
    width: '100%'
  },
  item: {
    display: 'inline-block',
    verticalAligin: 'top',
    maxWidth: "100%",
  },
  scrolContent: {
    padding: '20px'
  },
  badge: {
    maxWidth: "100%",
    fontSize: '16px',
    lineHeight: '20px',
    padding: '5px 15px',
    borderRadius: '15px 0 15px 15px',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    verticalAligin: 'top',
    opacity: '0.9',
    color: '#fff',
    ':hover': {
      opacity: '1'
    }
  },
  badgeLeft: {
    borderRadius: '0 15px 15px 15px',
  },
  badgeBg: {
    opacity: '0.8',
    position: 'absolute',
    left: '0',
    bottom: '0',
    height: '100%',
    width: '100%'
  },
  message: {
    position: 'relative'
  },
  scrollbar: {
    boxSizing: 'content-box',
    width: '100%',
    padding: '20px',
    margin: '-20px 0 0 -20px',
    position: 'relative',
    height: '100%'
  }
})
