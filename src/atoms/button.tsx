import React from 'react'
import styled, { css } from 'styled-components'
import {
  color as styledColor,
  space,
  SpaceProps,
  TypographyProps,
  typography,
  variant,
} from 'styled-system'

import focusShadowStyle from '../utils/focus-shadow.style'
import { cssClass } from '../utils/css-class'
import { VariantType } from '../utils'
import { ColorProps } from '../utils/color-props'
import themeGet from '../utils/theme-get'

const variantShared = {
  color: 'white',
  'border-color': 'transparent',
  [`& .${cssClass('Icon')} svg`]: {
    fill: 'white',
  },
  '&:disabled': {
    bg: 'grey40',
  },
}

const buttonVariants = variant({
  variants: {
    primary: {
      bg: 'primary100',
      '&:hover': {
        bg: 'hoverBg',
      },
      className: cssClass(['Button', 'Button_Primary']),
      ...variantShared,
    },
    danger: {
      bg: 'error',
      '&:hover': {
        bg: 'errorDark',
      },
      className: cssClass(['Button', 'Button_Danger']),
      ...variantShared,
    },
    success: {
      bg: 'success',
      '&:hover': {
        bg: 'successDark',
      },
      className: cssClass(['Button', 'Button_Success']),
      ...variantShared,
    },
    info: {
      bg: 'info',
      '&:hover': {
        bg: 'infoDark',
      },
      className: cssClass(['Button', 'Button_Info']),
      ...variantShared,
    },
    secondary: {
      bg: 'accent',
      className: cssClass(['Button', 'Button_Secondary']),
      ...variantShared,
    },
    text: {
      bg: 'transparent',
      borderColor: 'transparent',
      '&:disabled': {
        'border-color': 'transparent',
      },
      '&:hover': {
        background: 'transparent',
        color: 'hoverBg',
        'border-color': 'transparent',
        'text-decoration': 'underline',
      },
      '&:focus': {
        background: 'transparent',
        'border-color': 'transparent',
      },
      '& svg': {
        fill: 'primary100',
      },
      [`&:hover .${cssClass('Icon')} svg`]: {
        fill: 'hoverBg',
      },
      className: cssClass(['Button', 'Button_Text']),
    },
  },
})

const sizeVariants = variant({
  prop: 'size',
  variants: {
    sm: {
      fontSize: 'sm',
      py: 'xs',
      lineHeight: 'default',
      px: 'lg',
    },
    // md alias default
    md: {},
    default: {},
    lg: {
      py: 'default',
      px: 'x3',
      lineHeight: 'lg',
    },
    icon: {
      py: 'default',
      px: 'default',
      lineHeight: 'sm',
      minWidth: '34px',
      height: '34px',
      [`& .${cssClass('Icon')} svg`]: {
        padding: 0,
        margin: 0,
      },
    },
  },
})

// for some reason color causes issues that it can be null
type ButtonHTML = Omit<React.ComponentProps<'button'>, 'color'>

/**
 * Prop Types of an Button component.
 * Apart from those defined below it extends all {@link ColorProps}, {@link SpaceProps}
 * and {@link TypographyProps}
 *
 * @memberof Button
 * @alias ButtonProps
 * @property {string} [...] Other props from {@link ColorProps}, {@link SpaceProps}
 *                          and {@link TypographyProps}
 */
export type ButtonProps = ColorProps & SpaceProps & TypographyProps & {
  /**
   * Button color variant
   */
  variant?: VariantType | 'text';
  /**
   * Button size variant
   */
  size?: 'sm' | 'lg' | 'icon' | 'default' | 'md';
  /**
   * If button should be rounded
   */
  rounded?: boolean;

  /**
   * You can either pass an label prop - or use react Children.
   */
  label?: string
}

/**
 * Button CSS Styles which can be reused in another button-like component with styled-components
 *
 * Usage:
 * ```
 * import { ButtonCSS } from '@admin-bro/design-system'
 * import { Link } from 'react-router-dom'
 *
 * const MyStyledLink = styled(Link)`
 *   ${ButtonCSS}
 * `
 * ```
 * @memberof Button
 * @alias ButtonCSS
 */
export const ButtonCSS = css<ButtonProps>`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  display: inline-block;
  font-family: ${({ theme }): string => theme.font};
  line-height: ${themeGet('lineHeights', 'lg')};

  border: 1px solid ${themeGet('colors', 'primary100')};
  color: ${themeGet('colors', 'primary100')};
  cursor: pointer;
  text-decoration: none;
  padding: ${themeGet('space', 'sm')} ${themeGet('space', 'xxl')};
  box-sizing: border-box;

  & > .${cssClass('Icon')} {
    vertical-align: middle;
  }

  & > .${cssClass('Icon')} svg {
    margin: 0 ${themeGet('space', 'md')} 0 0;
  }

  & .${cssClass('Icon')} svg {
    fill: ${themeGet('colors', 'primary100')};
  }
  &:hover {
    color: ${themeGet('colors', 'white')};
    background: ${themeGet('colors', 'hoverBg')};
    border-color: ${themeGet('colors', 'hoverBg')};
    & .${cssClass('Icon')} svg {
      fill: ${themeGet('colors', 'white')};
    }
  }
  &:focus {
    border-color: ${themeGet('colors', 'accent')};
    ${({ theme }): string => `box-shadow: ${focusShadowStyle(theme)}`};
  }

  &:disabled {
    color: ${themeGet('colors', 'grey60')};
    border-color: ${themeGet('colors', 'grey80')};
    background: ${themeGet('colors', 'white')};
    cursor: default;
    & .${cssClass('Icon')} svg {
      fill: ${themeGet('colors', 'grey60')};
    }
  }

  ${({ rounded }): string => (rounded ? 'border-radius: 9999px' : '')};

  ${styledColor};
  ${space};
  ${typography};
  ${buttonVariants};
  ${sizeVariants};
`

const addContent = css<ButtonProps>`
  &:before {
    content: "${({ label }) => label}";
  }
`

/**
 * @classdesc
 *
 * <img src="components/button.png" />
 *
 * Buttons make common actions immediately visible and easy to perform with one click or tap.
 * They can be used for any type of action.
 *
 * ### Usage
 *
 * ```javascript
 * import { Button, ButtonCSS, ButtonProps } from '@admin-bro/design-system'
 * ```
 *
 * @component
 * @see ButtonProps
 * @see {@link https://storybook.adminbro.com/?path=/story/designsystem-atoms-button--default StoryBook}
 * @hideconstructor
 * @subcategory Atoms
 * @example <caption>Color variants</caption>
 * const variants = ['primary', 'danger', 'success', 'info', 'secondary', 'text']
 * return (
 * <Box py="lg">
 *   <Button mb="default" mr="default">default</Button>
 *   {variants.map(variant => (
 *     <Button mb="default" variant={variant} mr="default">{variant}</Button>
 *   ))}
 * </Box>
 * )
 * @example <caption>Size variants</caption>
 * return (
 * <Box py="lg">
 *   <Button size="sm">Small</Button>
 *   <Button ml="default">Regular size</Button>
 *   <Button size="lg" ml="default">Large</Button>
 * </Box>
 * )
 * @example <caption>Icons</caption>
 * return (
 * <Box py="lg">
 *  <Button mr="default">
 *    <Icon icon="Settings" />
 *    With icon
 *  </Button>
 *  <Button size="icon" mr="default"><Icon icon="Settings" /></Button>
 *  <Button rounded size="icon" mr="default"><Icon icon="Settings" /></Button>
 *  <Button variant="danger" mr="default">
 *    <Icon icon="Delete" />
 *    Delete me
 *  </Button>
 *  <Button mr="default" variant="text" size="sm">
 *    <Icon icon="Add" />
 *    Create new item
 *  </Button>
 * </Box>
 * )
 * @example <caption>State</caption>
 * return (
 * <Box py="lg">
 *   <Button disabled>Disabled</Button>
 *   <Button ml="default" variant="primary" disabled>Disabled</Button>
 * </Box>
 * )
 *
 * @section design-system
 */
const Button = styled.button<ButtonProps>`
  ${ButtonCSS};
  ${({ label }) => (label ? addContent : '')};
`

Button.defaultProps = {
  fontSize: 'default',
  backgroundColor: 'transparent',
}

export { Button }
export default Button
