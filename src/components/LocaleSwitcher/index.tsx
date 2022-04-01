import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons'
import { LocaleType, useLocale } from 'contexts/LocaleProvider'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useStyles } from './styles'

const LocaleSwitcher = () => {
  const {
    setLocale,
    data: { label, flag }
  } = useLocale()
  const { pathname, query, asPath } = useRouter()
  const [opened, setOpened] = useState(false)
  const { classes } = useStyles({ opened })

  const changeLocale = (locale: LocaleType) => {
    setLocale(locale)
  }

  return (
    <Menu
      closeOnItemClick
      position={'left'}
      opened={opened}
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      className={classes.menu}
      style={{ width: '160px' }}
      radius={'md'}
      control={
        <UnstyledButton color={'dark'} className={classes.button}>
          <Group style={{ justifyContent: 'space-between' }}>
            <Group>
              <Avatar size={'xs'} src={`/img/${flag}.svg`} />
              <Text size={'sm'} style={{ marginLeft: -7 }}>
                {label}
              </Text>
            </Group>
            <IconChevronDown size={16} />
          </Group>
        </UnstyledButton>
      }
    >
      <Link href={{ pathname, query }} as={asPath} locale={'br'} passHref>
        <Menu.Item
          icon={<Avatar size={'xs'} src={'/img/brasil.svg'} />}
          onClick={() => changeLocale('br')}
        >
          Português
        </Menu.Item>
      </Link>
      <Link href={{ pathname, query }} as={asPath} locale={'en'} passHref>
        <Menu.Item
          icon={<Avatar size={'xs'} src={'/img/usa.svg'} />}
          onClick={() => changeLocale('en')}
        >
          English
        </Menu.Item>
      </Link>
    </Menu>
  )
}

export default LocaleSwitcher
