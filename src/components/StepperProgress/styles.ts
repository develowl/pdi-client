import { StepperStylesParams } from '@mantine/core'
import { createStyles } from '@mantine/styles'

const iconSizes = {
  xs: 34,
  sm: 36,
  md: 42,
  lg: 48,
  xl: 52
}

export default createStyles(
  (
    theme,
    {
      contentPadding,
      orientation,
      iconPosition,
      iconSize,
      size,
      breakpoint
    }: StepperStylesParams
  ) => {
    const shouldBeResponsive = typeof breakpoint !== 'undefined'
    const breakpointValue = theme.fn.size({
      size: breakpoint,
      sizes: theme.breakpoints
    })
    const separatorOffset =
      typeof iconSize !== 'undefined'
        ? iconSize
        : theme.fn.size({ size, sizes: iconSizes })

    const verticalOrientationStyles = {
      steps: {
        flexDirection: 'column',
        alignItems: iconPosition === 'left' ? 'flex-start' : 'flex-end'
      },

      separator: {
        transform: `rotate(${theme.dir === 'rtl' ? '-90deg' : '90deg'})`,
        width: separatorOffset,
        minHeight: 2,
        marginLeft: 0,
        marginRight: 0,
        marginTop: separatorOffset / 1.5,
        marginBottom: separatorOffset / 1.5
      }
    } as const

    const responsiveStyles = {
      steps: {
        [`@media (max-width: ${breakpointValue}px)`]:
          verticalOrientationStyles.steps
      },

      separator: {
        [`@media (max-width: ${breakpointValue}px)`]:
          verticalOrientationStyles.separator
      }
    } as const

    return {
      root: {
        width: '100%'
      },

      steps: {
        display: 'flex',
        boxSizing: 'border-box',
        alignItems: 'center',
        ...(orientation === 'vertical'
          ? verticalOrientationStyles.steps
          : null),
        ...(shouldBeResponsive ? responsiveStyles.steps : null)
      },

      separator: {
        boxSizing: 'border-box',
        flex: 1,
        height: 2,
        marginLeft: theme.spacing.md,
        marginRight: theme.spacing.md,
        ...(orientation === 'vertical'
          ? verticalOrientationStyles.separator
          : null),
        ...(shouldBeResponsive ? responsiveStyles.separator : null)
      },

      content: {
        ...theme.fn.fontStyles(),
        paddingTop: theme.fn.size({
          size: contentPadding,
          sizes: theme.spacing
        })
      }
    }
  }
)
