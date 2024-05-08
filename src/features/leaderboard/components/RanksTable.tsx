import {
  Avatar,
  Badge,
  Center,
  Flex,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { userStore } from '@/store/user';

import { type RowType, type SKILL } from '../types';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  maximumFractionDigits: 0,
  currency: 'USD',
}).format;

interface Props {
  rankings: RowType[];
  skill: SKILL;
  userRank: RowType | null;
}

export function RanksTable({ rankings, skill, userRank }: Props) {
  const { userInfo } = userStore();

  return (
    <TableContainer
      className="hide-scrollbar"
      pos="relative"
      overflowX="auto"
      w="full"
      h={
        rankings.length === 0
          ? '35rem'
          : {
              base: '39rem',
              md: '47.4rem',
            }
      }
      border="1px solid #E2E8F0"
      borderRadius="md"
    >
      <Table>
        <Thead>
          <Tr textTransform={'none'} bg="#F8FAFC">
            <Th
              px={{ base: 1, md: 2 }}
              color="brand.slate.500"
              fontSize={'xs'}
              fontWeight={500}
              letterSpacing={0.5}
              textAlign={'center'}
              textTransform={'none'}
            >
              Rank
            </Th>
            <Th
              px={{ base: 1, md: 2 }}
              color="brand.slate.500"
              fontSize={'xs'}
              fontWeight={500}
              letterSpacing={0.5}
              textAlign={'start'}
              textTransform={'none'}
            >
              Name
            </Th>
            <Th
              px={{ base: 1, md: 2 }}
              color="brand.slate.500"
              fontSize={'xs'}
              fontWeight={500}
              letterSpacing={0.5}
              textAlign={'center'}
              textTransform={'none'}
            >
              <Text display={{ base: 'none', md: 'block' }}>
                Dollars Earned
              </Text>
              <Text display={{ base: 'block', md: 'none' }}>$ Earned</Text>
            </Th>
            <Th
              px={{ base: 1, md: 2 }}
              color="brand.slate.500"
              fontSize={'xs'}
              fontWeight={500}
              letterSpacing={0.5}
              textAlign={'center'}
              textTransform={'none'}
            >
              Win Rate
            </Th>
            <Th
              overflowX="hidden"
              maxW="3.5rem"
              px={{ base: 1, md: 2 }}
              color="brand.slate.500"
              fontSize={'xs'}
              fontWeight={500}
              letterSpacing={0.5}
              textAlign={'center'}
              textTransform={'none'}
              textOverflow="ellipsis"
            >
              Submissions
            </Th>
            <Th
              px={{ base: 1, md: 2 }}
              color="brand.slate.500"
              fontSize={'xs'}
              fontWeight={500}
              letterSpacing={0.5}
              textAlign={'center'}
              textTransform={'none'}
            >
              Wins
            </Th>
            <Th
              display={{ base: 'none', md: skill !== 'ALL' ? 'none' : 'block' }}
              px={{ base: 1, md: 2 }}
              color="brand.slate.500"
              fontSize={'xs'}
              fontWeight={500}
              letterSpacing={0.5}
              textAlign={'start'}
              textTransform={'none'}
            >
              Skills
            </Th>
          </Tr>
        </Thead>
        {rankings.length === 0 && (
          <VStack
            pos="absolute"
            top={'10rem'}
            left="50%"
            mx="auto"
            transform="translateX(-50%)"
          >
            <Center w={20} h={20} bg="brand.slate.100" rounded="full">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_482_662)">
                  <path
                    d="M16 11V3H8V9H2V21H22V11H16ZM10 5H14V19H10V5ZM4 11H8V19H4V11ZM20 19H16V13H20V19Z"
                    fill="#64748B"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_482_662">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Center>
            <VStack fontSize="xs" fontWeight={500}>
              <Text>The Leaderboard is empty for your filters</Text>
              <Text color="brand.slate.500">
                Please change your filters or try again later
              </Text>
            </VStack>
          </VStack>
        )}
        {rankings.length > 0 && (
          <Tbody color="brand.slate.500" fontSize="xs" fontWeight={500}>
            {rankings.map((row) => (
              <Tr key={row.username} h="full">
                <Td h="full" px={{ base: 1, md: 2 }} textAlign={'center'}>
                  #{row.rank}
                </Td>
                <Td h="full" px={{ base: 1, md: 2 }}>
                  <Link
                    as={NextLink}
                    alignItems="center"
                    gap={2}
                    display="flex"
                    href={`/t/${row.username}`}
                    target="_blank"
                  >
                    <Avatar
                      w={{ base: 5, md: 8 }}
                      h={{ base: 5, md: 8 }}
                      src={row.pfp ?? undefined}
                    />
                    <VStack
                      align="start"
                      justify={{ base: 'center', md: 'start' }}
                      gap={1}
                      lineHeight={1}
                    >
                      <Text
                        display={{ base: 'block', md: 'none' }}
                        overflowX="hidden"
                        maxW={'7rem'}
                        color="black"
                        _groupHover={{
                          textDecoration: 'underline',
                        }}
                        textOverflow={'ellipsis'}
                      >
                        {row.name.split(' ')[0] +
                          ' ' +
                          row.name.split(' ')[1]?.slice(0, 1).toUpperCase()}
                      </Text>
                      <Text
                        display={{ base: 'none', md: 'block' }}
                        overflowX="hidden"
                        maxW={'7rem'}
                        color="black"
                        textOverflow={'ellipsis'}
                      >
                        {row.name}
                      </Text>
                      <Text
                        display={{ base: 'none', md: 'block' }}
                        overflowX="hidden"
                        maxW={'7rem'}
                        textOverflow={'ellipsis'}
                      >
                        @{row.username}
                      </Text>
                    </VStack>
                  </Link>
                </Td>
                <Td h="full" px={{ base: 1, md: 2 }}>
                  <Flex
                    justify="center"
                    gap={2}
                    fontSize={{ base: 'xs', md: 'sm' }}
                  >
                    <Text color="black" textAlign={'center'}>
                      {formatter(row.dollarsEarned)}
                    </Text>
                    <Text
                      display={{ base: 'none', md: 'block' }}
                      textAlign={'center'}
                    >
                      USD
                    </Text>
                  </Flex>
                </Td>
                <Td
                  h="full"
                  px={{ base: 1, md: 2 }}
                  fontSize={{ base: 'xs', md: 'sm' }}
                  textAlign={'center'}
                >
                  {row.winRate}%
                </Td>
                <Td h="full" px={{ base: 1, md: 2 }} textAlign={'center'}>
                  {row.submissions}
                </Td>
                <Td h="full" px={{ base: 1, md: 2 }} textAlign={'center'}>
                  {row.wins}
                </Td>
                <Td
                  display={{
                    base: 'none',
                    md: skill !== 'ALL' ? 'none' : 'table-cell',
                  }}
                  h="full"
                  px={{ base: 1, md: 2 }}
                >
                  <Flex gap={2} h="full" textAlign={'center'}>
                    {row.skills.slice(0, 2).map((s) => (
                      <Badge
                        key={s}
                        px={2}
                        color="#64739C"
                        fontSize={'xx-small'}
                        fontWeight={500}
                        textTransform={'none'}
                        bg="#EFF1F5"
                        rounded="full"
                      >
                        {s}
                      </Badge>
                    ))}
                    {row.skills.length > 2 && (
                      <Badge
                        px={2}
                        color="#64739C"
                        fontSize={'xx-small'}
                        fontWeight={500}
                        textTransform={'none'}
                        bg="#EFF1F5"
                        rounded="full"
                      >
                        +{row.skills.length - 2}
                      </Badge>
                    )}
                  </Flex>
                </Td>
              </Tr>
            ))}
            {userInfo && (
              <Tr pos="sticky" zIndex={100} bottom={0} h="full" bg="#F5F3FF80">
                <Td
                  h="full"
                  px={{ base: 1, md: 2 }}
                  textAlign={'center'}
                  borderBottomWidth={'0px'}
                >
                  {userRank ? '#' + userRank.rank : '-'}
                </Td>
                <Td h="full" px={{ base: 1, md: 2 }} borderBottomWidth={'0px'}>
                  <Link
                    as={NextLink}
                    alignItems="center"
                    gap={2}
                    display="flex"
                    href={`/t/${userInfo.username}`}
                    target="_blank"
                  >
                    <Avatar
                      w={{ base: 5, md: 8 }}
                      h={{ base: 5, md: 8 }}
                      src={userInfo.photo ?? undefined}
                    />
                    <VStack
                      align="start"
                      justify={{ base: 'center', md: 'start' }}
                      gap={1}
                      lineHeight={1}
                    >
                      <Text
                        display={{ base: 'block', md: 'none' }}
                        overflowX="hidden"
                        maxW={'7rem'}
                        color="black"
                        _groupHover={{
                          textDecoration: 'underline',
                        }}
                        textOverflow={'ellipsis'}
                      >
                        {userInfo.firstName +
                          ' ' +
                          userInfo.lastName?.slice(0, 1).toUpperCase()}
                      </Text>
                      <Text
                        display={{ base: 'none', md: 'block' }}
                        overflowX="hidden"
                        maxW={'7rem'}
                        color="black"
                        textOverflow={'ellipsis'}
                      >
                        {userInfo.firstName + ' ' + userInfo.lastName}
                      </Text>
                      <Text
                        display={{ base: 'none', md: 'block' }}
                        overflowX="hidden"
                        maxW={'7rem'}
                        textOverflow={'ellipsis'}
                      >
                        @{userInfo.username}
                      </Text>
                    </VStack>
                  </Link>
                </Td>
                <Td h="full" px={{ base: 1, md: 2 }} borderBottomWidth={'0px'}>
                  <Flex
                    justify="center"
                    gap={2}
                    fontSize={{ base: 'xs', md: 'sm' }}
                  >
                    <Text color="black" textAlign={'center'}>
                      {formatter(userRank?.dollarsEarned ?? 0)}
                    </Text>
                    <Text
                      display={{ base: 'none', md: 'block' }}
                      textAlign={'center'}
                    >
                      USD
                    </Text>
                  </Flex>
                </Td>
                <Td
                  h="full"
                  px={{ base: 1, md: 2 }}
                  fontSize={{ base: 'xs', md: 'sm' }}
                  textAlign={'center'}
                  borderBottomWidth={'0px'}
                >
                  {userRank?.winRate ?? 0}%
                </Td>
                <Td
                  h="full"
                  px={{ base: 1, md: 2 }}
                  textAlign={'center'}
                  borderBottomWidth={'0px'}
                >
                  {userRank?.submissions ?? '-'}
                </Td>
                <Td
                  h="full"
                  px={{ base: 1, md: 2 }}
                  textAlign={'center'}
                  borderBottomWidth={'0px'}
                >
                  {userRank?.wins ?? '-'}
                </Td>
                <Td
                  display={{
                    base: 'none',
                    md: skill !== 'ALL' ? 'none' : 'table-cell',
                  }}
                  h="full"
                  px={{ base: 1, md: 2 }}
                  borderBottomWidth={'0px'}
                >
                  <Flex gap={2} h="full" textAlign={'center'}>
                    {userRank?.skills.slice(0, 2).map((s) => (
                      <Badge
                        key={s}
                        px={2}
                        color="#64739C"
                        fontSize={'xx-small'}
                        fontWeight={500}
                        textTransform={'none'}
                        bg="#EFF1F5"
                        rounded="full"
                      >
                        {s}
                      </Badge>
                    ))}
                    {userRank && userRank.skills.length > 2 && (
                      <Badge
                        px={2}
                        color="#64739C"
                        fontSize={'xx-small'}
                        fontWeight={500}
                        textTransform={'none'}
                        bg="#EFF1F5"
                        rounded="full"
                      >
                        +{userRank.skills.length - 2}
                      </Badge>
                    )}
                  </Flex>
                </Td>
              </Tr>
            )}
          </Tbody>
        )}
      </Table>
    </TableContainer>
  );
}
