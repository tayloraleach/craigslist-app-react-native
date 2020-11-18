import * as React from 'react';
import {FlatList, SafeAreaView, View, ActivityIndicator} from 'react-native';
import SearchResultItem from '../components/SearchResultItem';
import colors from '../lib/colors';
import fetcher from '../lib/fetcher';

function SearchResultsScreen({route}) {
  const {
    searchTerm,
    location,
    hasImages,
    postedToday,
    searchTitlesOnly,
    ownerType,
  } = route.params;
  const [loading, setLoading] = React.useState(true);
  const [results, setResults] = React.useState([]);

  const getResults = async () => {
    const data = await fetcher(
      `http://192.168.1.73:5000/search?location=${location}&searchTerm=${searchTerm}&hasImages=${hasImages}&postedToday=${postedToday}&searchTitlesOnly=${searchTitlesOnly}&ownerType=${ownerType}`,
    );
    return data;
  };

  React.useEffect(
    () => {
      if (!results.length) {
        (async () => {
          const data = await getResults();
          setResults(data);
          setLoading(false);
        })();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const DATA = [
    {
      title: 'Toyota OEM 17 inch rims from 4Runner',
      price: '$600',
      images: [
        'https://images.craigslist.org/00X0X_1tcPYvWL6XD_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/01212_alOEcYddXFN_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/01313_bMTSGG5If5l_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/01616_9WNswJPWBr9_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00k0k_eiWoZo29H4p_0t20CI_300x300.jpg',
        'https://images.craigslist.org/00D0D_6wmizBPKEHe_0CI0t2_300x300.jpg',
      ],
      hood: 'North Vancouver',
      url:
        'https://vancouver.craigslist.org/nvn/pts/d/north-vancouver-toyota-oem-17-inch-rims/7232268822.html',
    },
    {
      title: '⭐AUDI A7 QUATTRO SUPERCHARGED SPORT PREMIUM LOW KM',
      price: '$23,800',
      images: [
        'https://images.craigslist.org/00t0t_a9Y091inQLe_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00000_fgFBfAZTvyt_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/01414_rPEG2jhA15_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00h0h_gqLqQLvDNOx_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00u0u_d9nU5Wfe3tV_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/01414_aaGnPOwZQPR_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00X0X_huEO5sffXfo_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00303_3nEuxU8uuA9_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00y0y_j6rMiDOpANT_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00202_eV7gtD4yyM_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00e0e_71orhwe5OR9_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00M0M_k31dEoiJrQt_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00e0e_5gGiCC2Dro9_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00U0U_gx2qyg6s5lC_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00l0l_fYPrWDf4JSB_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00q0q_8hXvaaSSYLH_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00K0K_cB11KrQQUws_0f609Y_300x300.jpg',
      ],
      hood: 'LANGLEY',
      url:
        'https://vancouver.craigslist.org/bnc/ctd/d/aldergrove-audi-a7-quattro-supercharged/7232269110.html',
    },
    {
      title: 'Like new Toyota Tacoma 4Runner tires 265/65/17',
      price: '$400',
      images: [
        'https://images.craigslist.org/00c0c_6YzKOF498OX_0t20lM_300x300.jpg',
        'https://images.craigslist.org/00u0u_gi5gJKktq6m_0t20lM_300x300.jpg',
      ],
      hood: 'New Westminster',
      url:
        'https://vancouver.craigslist.org/bnc/wto/d/new-westminster-like-new-toyota-tacoma/7232265698.html',
    },
    {
      title: 'New Dunlop tires P 245/75/16 with alloy wheels Tacoma 4Runner',
      price: '$695',
      images: [
        'https://images.craigslist.org/01313_daUhD2qI78d_0t20CI_300x300.jpg',
        'https://images.craigslist.org/00k0k_jGNZhoe7Gvd_0t20CI_300x300.jpg',
        'https://images.craigslist.org/00t0t_eh0KfK3WdTa_0t20CI_300x300.jpg',
        'https://images.craigslist.org/01111_7Qa5vwQW1qW_0t20CI_300x300.jpg',
      ],
      hood: 'Burnaby',
      url:
        'https://vancouver.craigslist.org/bnc/wto/d/burnaby-new-dunlop-tires-with-alloy/7232265441.html',
    },
    {
      title: '265/65/17 Hankook Dynapro ATM All Terrain Tires NEW',
      price: '$549',
      images: [
        'https://images.craigslist.org/00b0b_ldUV47s5gzl_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00d0d_4xAM4YL7882_0t20CI_300x300.jpg',
        'https://images.craigslist.org/00000_9XWPA0NQC3M_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00o0o_6gvRP3lgSdf_0CI0t2_300x300.jpg',
      ],
      hood: 'Fraservalley',
      url:
        'https://vancouver.craigslist.org/pml/wto/d/mission-east-hankook-dynapro-atm-all/7231175870.html',
    },
    {
      title: 'NEW 265/60/18 Goodyear Wrangler Fortitude HT',
      price: '$599',
      images: [
        'https://images.craigslist.org/00K0K_lPcJ84Mvgsc_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00c0c_lAoeuE1Yrx4_0t20CI_300x300.jpg',
      ],
      hood: 'Valley',
      url:
        'https://vancouver.craigslist.org/pml/wto/d/mission-east-new-goodyear-wrangler/7231183574.html',
    },
    {
      title:
        "2020 TOYOTA 4RUNNER 4 RUNNER LIMITED // ONLY 5,000 KM'S //MANAGER DEMO",
      price: '$52,985',
      images: [
        'https://images.craigslist.org/00F0F_4broG6FbALo_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00x0x_9lT35EgDZtu_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00z0z_3QCZGHhG4uA_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00d0d_i2WeoZ4MQ5j_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00c0c_jjJscmRU2Nj_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00m0m_kyXWpKE7j6_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00B0B_j8MJRZWkmbv_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00I0I_kgxK3wReOqK_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00h0h_hqxqYN9hqk0_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00c0c_hQ3mImchxJs_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00505_3N7nJXi61Qa_0jm0ew_300x300.jpg',
        'https://images.craigslist.org/00K0K_dUSPc7VwfCa_0jm0ew_300x300.jpg',
        'https://images.craigslist.org/00202_bhBztN8Q9gw_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/01313_dtUkQgTl5e5_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00U0U_4a4cVdaYPT5_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00n0n_2rGmZuw1fD0_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00w0w_4tRJkZGo63v_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00Y0Y_2sxzXXf7YUr_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00r0r_gOi79KOeX9r_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00e0e_geIs12ULynC_0CI0t2_300x300.jpg',
        'https://images.craigslist.org/00303_lSZAIK3rhR8_0CI0t2_300x300.jpg',
      ],
      hood: 'CALL/TEXT RICK @ 7782393895',
      url:
        'https://vancouver.craigslist.org/van/ctd/d/burnaby-2020-toyota-4runner-runner/7232258162.html',
    },
  ];

  const renderItem = ({item}) => <SearchResultItem item={item} />;

  return (
    <View
      style={{
        flex: 1,
      }}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.purple} />
        </View>
      ) : (
        <SafeAreaView style={{width: '100%'}}>
          <FlatList
            style={{
              marginHorizontal: 10,
              marginTop: 10,
            }}
            data={results}
            renderItem={renderItem}
            keyExtractor={item => item.title + item.price}
          />
        </SafeAreaView>
      )}
    </View>
  );
}

export default SearchResultsScreen;
